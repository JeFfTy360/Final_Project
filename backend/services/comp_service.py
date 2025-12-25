from models.employee import Employee
from models.company import Company
from models.CompanyEmployee import CompanyEmployee
from models.invitation import Invitation
from models.appointments import Appointment
from models.service import Service
from schemas.service import ServiceCreation
from schemas.service import ServiceModification
from models.EmployeeService import EmployeeService
from tortoise.functions import Count
from tortoise.functions import Avg
import random
import string
from tortoise.expressions import Q

class CompService:
    
    async def get_all_employees(self, companyId: int):
        employees = await CompanyEmployee.filter(company_id=companyId).prefetch_related("employee", "employee__employee")
        
        result = []
        for each in employees:
            usr = each.employee
            emp = usr.employee  

            result.append({
                "id": usr.id,
                "name": usr.name,
                "email": usr.email,
                "phone": usr.phone,
                "profil_url": usr.profil_url,
                "title": emp.title if emp else None,
                "bio": emp.bio if emp else None,
                "profile_url": emp.profile_url if emp else None,
            })
        return result
    
    async def get_all_invitations(self, companyId: int):
        invitations = await Invitation.filter(company_id=companyId).prefetch_related("employee")
        result = []
        for each in invitations:
            emp = each.employee
            result.append(
                {
                "id":each.id,
                "name":emp.name,
                "email":emp.email,
                "status":each.status,
                "title": (await Employee.get(employee_id=emp.id)).title
            })
        return result
    
    async def accept_invitation(self, companyId: int, invitationId: int):
        invitation = await Invitation.get_or_none(id=invitationId, company_id=companyId, status="pending")
        if not invitation:
            return {"message": "Invitation not found or does not belong to this company"}
        invitation.status = "accepted"
        await invitation.save()
        
        # Add employee to company
        await CompanyEmployee.create(company_id=companyId, employee_id=invitation.employee_id)  
        return invitation
    
    async def denied_invitation(self, companyId: int, invitationId: int):
        invitation = await Invitation.get_or_none(id=invitationId, company_id=companyId, status="pending")
        if not invitation:
            return {"message": "Invitation not found or does not belong to this company"}
        invitation.status = "denied"
        await invitation.save()
        return invitation
    
    async def remove_employee(self, companyId: int, employeeId: int):
        company_employee = await CompanyEmployee.get(company_id=companyId, employee_id=employeeId)
        if not company_employee:
            return {"message": "Employee not found or does not belong to this company"}
        await company_employee.delete()
        return {"message": "Employee removed from company successfully"}
    
    
    # statistique
    
    
    async def general_stat(self, companyId:int):
        print(companyId)
        Quantity_employees = await CompanyEmployee.filter(company_id=companyId).count()
        result_popular = await Service.filter(company_id=companyId).prefetch_related("service_appointments")
        max = -1
        popular_service = None
        for service in result_popular:
            appointments = service.service_appointments
            if not appointments:
                continue
            count_appointment = len([a for a in appointments])
            if count_appointment > max:
                max = count_appointment
                popular_service = service
        sum_rating_ = 0
        count_rating_ = 0
        for service in result_popular:
            appointments = service.service_appointments
            if not appointments:
                continue
            rating = [a.rating for a in appointments if a.rating is not None]
            sum_rating_ += sum(rating)
            count_rating_ += len(rating)
        try:
            avg_rating = sum_rating_/count_rating_
        except:
            avg_rating = 0
        return {
            "total_employees":Quantity_employees,
            "popular_service": popular_service,
            "company_rate":avg_rating
        }
        
    async def stat_by_data(self, companyId:int, month:int):
        # Récupérer les services avec leurs rendez-vous
        services = await Service.filter(company_id=companyId).prefetch_related("service_appointments")

        month_rdv = []

        # Filtrer les rendez-vous du mois sélectionné
        for service in services:
            for rdv in service.service_appointments:
                if rdv.date.month == month:
                    month_rdv.append(rdv)

        # Aucun rendez-vous → renvoyer vide
        if not month_rdv:
            return {
                "categories": [],
                "series": [
                    {"name": "Rendez-vous effectués", "data": []},
                    {"name": "Rendez-vous annulés", "data": []},
                    {"name": "Rendez-vous en attente", "data": []},
                ]
            }

        # Extraire les dates uniques triées
        date_set = {rdv.date for rdv in month_rdv}
        sorted_dates = sorted(date_set)

        categories = [d.strftime("%d/%m") for d in sorted_dates]

        # Initialiser les tableaux de données
        done_data = [0] * len(categories)
        canceled_data = [0] * len(categories)
        pending_data = [0] * len(categories)

        # Remplir les données
        for rdv in month_rdv:
            formatted = rdv.date.strftime("%d/%m")
            index = categories.index(formatted)

            if rdv.status == "done":
                done_data[index] += 1
            elif rdv.status == "canceled":
                canceled_data[index] += 1
            elif rdv.status == "pending":
                pending_data[index] += 1

        # Réponse finale pour ApexCharts
        return {
            "categories": categories,
            "series": [
                {"name": "Rendez-vous effectués", "data": done_data},
                {"name": "Rendez-vous annulés", "data": canceled_data},
                {"name": "Rendez-vous en attente", "data": pending_data},
            ],
        }


    async def rate_employees_by_services(self, CompanyId:int):
        all_services = await Service.filter(company_id=CompanyId)
        all_services = list(all_services)
        results = []

        for each in all_services:
            employees = await EmployeeService.filter(service_id=each.id).prefetch_related("employee")

            results.append({
            "service": each.name,
            "employees": [
                {
                    "id": e.employee.id,
                    "name": e.employee.name,
                    "rating": (
                        lambda ratings: sum(ratings) / len(ratings) if ratings else None
                    )(
                        [
                            a.rating
                            for a in await Appointment.filter(
                                service_id=each.id,
                                employee_id=e.employee.id
                            )
                            if a.rating is not None
                        ]
                    ),
                    "appointment": await Appointment.filter(employee_id=e.employee.id, service_id=each.id).count()
                }
                for e in employees
            ]})
            return results



    
    async def statistics_per_employee(self, companyId: int):
        appointments = await Appointment.filter(
            service__company_id=companyId
        ).prefetch_related("employee")
        total_appointments = len(appointments)

        if total_appointments == 0:
            return []

        # Dictionnaire { employee_id: count }
        employee_counts = {}


        for each in appointments:
            emp_id = each.employee.id
            if emp_id not in employee_counts:
                employee_counts[emp_id] = {
                    "employee": each.employee,
                    "count": 0
                }
            employee_counts[emp_id]["count"] += 1

        results = []
        for emp_id, data in employee_counts.items():
            employee = data["employee"]
            count = data["count"]
            percentage = (count / total_appointments) * 100

            results.append({
                "employee_id": emp_id,
                "employee_name": employee.name,
                "count": count,
                "percentage": round(percentage, 2)
            })

        results.sort(key=lambda x: x["percentage"], reverse=True)

        return results
    
    async def rate_per_employee(self, companyId: int):
        appointments = await Appointment.filter(
            service__company_id=companyId
        ).prefetch_related("employee")

        if not appointments:
            return []

        employee_count = {}

        for each in appointments:
            emp_id = each.employee.id
            if emp_id not in employee_count:
                employee_count[emp_id] = {
                    "employee_id": emp_id,
                    "employee": each.employee.name,
                    "total_rate": 0,
                    "total_appointment": 0,
                }

            if each.rating: 
                employee_count[emp_id]["total_rate"] += each.rating

            employee_count[emp_id]["total_appointment"] += 1

        result = []
        for data in employee_count.values():
            total = data["total_appointment"]
            data["average_rate"] = data["total_rate"] / total if total > 0 else 0
            result.append(data)

        result.sort(key=lambda x: x["average_rate"], reverse=True)

        return result

    async def rate_company(self, companyId: int):
        appointments = await Appointment.filter(
            service__company_id=companyId,
            rating__not_isnull=True  # On ignore les ratings null
        )

        total_appointments = len(appointments)

        if total_appointments == 0:
            return {
                "company_id": companyId,
                "average_rating": 0,
                "total_ratings": 0,
                "total_appointments": 0
            }

        sum_rate = sum(each.rating for each in appointments)

        return {
            "company_id": companyId,
            "average_rating": sum_rate / total_appointments,
            "total_ratings": total_appointments,
            "total_appointments": await Appointment.filter(service__company_id=companyId).count()
        }


    async def get_code_invitation_company(self, companyId: int):
        company = await Company.get_or_none(company_id=companyId)
        return {"code":company.invitation_code}
    
    async def generate_code_company(self, companyId: int):
        company = await Company.get_or_none(company_id=companyId)
        if not company:
            return {"error": "Company not found"}

        async def generate_unique_code():
            while True:
                code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
                exists = await Company.filter(invitation_code=code).exists()

                if not exists:
                    return code

        new_code = await generate_unique_code()

        company.invitation_code = new_code
        await company.save()

        return {"code": new_code}
    

    async def profil_company(self, companyId:int):
        company = await Company.get_or_none(company_id=companyId)
        if not company:
            return {"message":"company account don't found"}
        return company
    
    
    
    async def get_service(self, companyId: int):
        service = await Service.filter(company_id=companyId)
        return service
    
    async def add_service(self,companyId: int, service_data: ServiceCreation):
        
        service = await Service.create(
            name = service_data.name,
            description = service_data.description,
            price = service_data.price,
            media_url = service_data.media_url,
            company_id = companyId
        )
        return {"message": "service created successfully"}
        # return service
        # pass
    
    async def put_service(self, companyId: int,serviceId: int, service_data: ServiceModification):
        service = await Service.get_or_none(
            id=serviceId, company_id=companyId
        )
        data = service_data.model_dump(exclude_unset=True)
        
        if not service:
           return {"message": "Service not found or does not belong to this company"}
        
        
        
        service.update_from_dict(data)
        await service.save()
        
        return {
            "message": "Service updated successfully",
            "service": {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "price": service.price,
            "media_url": service.media_url
        }
    }
    
    async def delete_service(self, companyId: int, serviceId:int):
        service = await Service.get_or_none(
            id=serviceId, company_id=companyId
        )
        if not service:
            return {"message":"Service not found or does not belong to this company"}
        await service.delete()
        return {"message":"service deleted successfully"}
        
    
    async def add_employee_to_service(self, companyId: int, serviceId:int, employeeId:int ):
        service = await Service.get_or_none(
            id=serviceId, company_id=companyId
        )
         
        if not service:
            return {"message":"Employee or service not found or does not belong to this company"}
         
        ce = await CompanyEmployee.get_or_none(
            company_id = companyId,
            employee_id = employeeId,
        )
        if not ce:
            return {"message":"Employee or service not found or does not belong to this company"}
        
        await EmployeeService.create(
            employee_id = employeeId,
            service_id = service.id
        )
        return {"message":"Employee added successfully to service"}
    
    
    async def remove_employee_to_service(self, serviceId: int, employeeId:int):
        print("ok")
        employe__service = await EmployeeService.get_or_none(
            employee_id = employeeId,
            service_id = serviceId
        )
        
        if not employe__service:
            return {"message":"Employee or service not found or does not belong to this company"}
        
        await employe__service.delete()
        
        
        return {"message":"Employee removed successfully to service"}
        
    
    
    async def get_employee_from_service(self, companyId:int, serviceId:int):
        service = await EmployeeService.filter(service_id=serviceId).prefetch_related("employee")

        result = []
        for each in service:
            result.append(each.employee)
        return result
            
            
    
    