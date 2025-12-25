
from models.company import Company
from models.invitation import Invitation
from models.appointments import Appointment
from models.CompanyEmployee import CompanyEmployee
from models.EmployeeService import EmployeeService
from models.service import Service
from schemas.employee import AddSchedules
from models.schedules import Schedule
from models.employee import Employee
from models.user import User
from schemas.client import AddAppointment


class ClientService():
    
    async def get_services_for_appointment(self):
        all_services = await Service.all().prefetch_related(
            'company__company',  # Charger User puis Company
            'service_employee__employee'
        )
        
        results = []
        
        for service in all_services:
            # Récupérer la company - service.company est un User, donc on accède à company.company
            company_user = await service.company
            company = await company_user.company  # Relation OneToOne User -> Company
            
            # Récupérer les employés qui offrent ce service
            employee_services = await EmployeeService.filter(
                service_id=service.id
            ).prefetch_related('employee')
            
            employees = []
            for emp_service in employee_services:
                # Récupérer l'utilisateur employé
                user = await User.get(id=emp_service.employee_id).prefetch_related('employee')
                
                # Récupérer les disponibilités (schedules) de cet employé pour ce service
                schedules = await Schedule.filter(
                    employee_id=emp_service.employee_id,
                    service_id=service.id,
                    status='available'  # Ajustez selon vos statuts
                ).order_by('date', 'start_time')
                
                # Formater les disponibilités
                availability = []
                for schedule in schedules:
                    availability.append({
                        "date": schedule.date.isoformat(),
                        "start_time": schedule.start_time.isoformat(),
                        "end_time": schedule.end_time.isoformat(),
                        "status": schedule.status
                    })
                
                employees.append({
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "rating": user.rating,
                    "availability": availability
                })
            
            results.append({
                "id": service.id,
                "name": service.name,
                "description": service.description,
                "price": service.price,
                "media_url": service.media_url,
                "company": {
                    "id": company.company_id,
                    "name": company.company_name,
                    "address": company.address,
                    "description": company.description
                },
                "employees": employees
            })
        return results
    
    async def take_appointment(self,user_id,serviceId:int, employeeId:int, appointment_data: AddAppointment):
        print(appointment_data)
        appointment = await Appointment.create(
            start_time = appointment_data.starttime,
            end_time = appointment_data.endtime,
            date = appointment_data.date,
            client_id = user_id,
            employee_id = employeeId,
            service_id = serviceId, 
        )
        return {"message":"appointment created successfully"}
    
    async def get_client_appointment(self, user_id):
        appointments = await Appointment.filter(client_id=user_id).prefetch_related("client","employee","service__company",)
        
        
        results = []
        
        # print(appointments)
        for each in appointments:
            company = await Company.get(company_id=each.service.company.id)
            
            results.append({
                "id":each.id,
                "service_name":each.service.name,
                "date":each.date,
                "start_time":each.start_time,
                "end_time":each.end_time,
                "status":each.status,
                "address":company.address,
                "company_name":company.company_name,
                "client":each.client.name +"-"+each.client.email
            })
            # print(each.service.name)
            # # print(each.employee.name)
            # # print(each.employee.email)
            # print(each.date)
            # print(each.start_time)
            # print(each.end_time)
            # print(each.status)
            # print(company.address)
            # print(company.company_name)
            # print(each.client.name)
            
        return results