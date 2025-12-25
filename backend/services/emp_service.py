
from models.company import Company
from models.invitation import Invitation
from models.appointments import Appointment
from models.CompanyEmployee import CompanyEmployee
from models.EmployeeService import EmployeeService
from models.service import Service
from schemas.employee import AddSchedules
from models.schedules import Schedule


class EmpService():
    
    async def join_enterprise(self, employeeId:int, invitation_code:str):
        company = await Company.get_or_none(invitation_code=invitation_code)
        if not company:
            return {"message":"invitation's code incorrect"}
        await Invitation.create(employee_id=employeeId,company_id=company.company_id)
        return {"message":"invitation succcessfully send"}
   
    async def employee_appointment(self, employeeId):
        appointments = await Appointment.filter(employee_id=employeeId).prefetch_related("client","employee","service__company",)
        
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
    
    async def accept_appointment(self, employeeId, appointmentId):
        appointment = await Appointment.get_or_none(id=appointmentId)
        
        if not appointment:
            return {"message":"appointment don't found"}
        
        if appointment.employee_id != employeeId:
            return {"message":"appointment don't found"}
        
        appointment.status = "accepted"
        await appointment.save()
        
        return {"message":"Appointment successfully confirmed"}
    
    
    async def denied_appointment(self, employeeId, appointmentId):
        appointment = await Appointment.get_or_none(id=appointmentId)
        
        if not appointment:
            return {"message":"appointment don't found"}
        
        if appointment.employee_id != employeeId:
            return {"message":"appointment don't found"}
        
        appointment.status = "denied"
        await appointment.save()
        
        return {"message":"Appointment successfully confirmed"}
    


    async def get_list_join_request(self, employeeId):
        print(employeeId)
        request = await Invitation.filter(employee_id	= employeeId)
        
        
        results = []
        
        for each in request:
            company = await Company.get(company_id=each.company_id)
            results.append({
                "id":each.id,
                "company":company.company_name,
                "status":each.status,
            })
        
        
        return results
    
    async def get_company_work_for(self, employeeId):
        company = await CompanyEmployee.filter(employee_id = employeeId)
        
        result = []
        
        for each in company:
            company = await Company.get(company_id=each.company_id)
            result.append({
                "id":each.id,
                "company":company.company_name,
                "address":company.address,
            })
        return result
    
    async def get_service_work_in(self, employeeId, companyId):
        service = await EmployeeService.filter(employee_id = employeeId)
        
        result = []
        
        for each in service:
            service = await Service.get(id=each.service_id)
            result.append({
                "id":each.service_id,
                "name":service.name,
                # "address":company.address,
            })
        return result
        
    
    async def add_disponibility_for_service(self, employeeId, serviceId, schedule:AddSchedules):
        print("Heree",schedule)
        sched = await Schedule.create(
            date = schedule.date,
            start_time = schedule.start_time,
            end_time = schedule.end_time,
            service_id = serviceId,
            employee_id = employeeId,
        )
        # await sched.save
        pass
    
    async def delete_disponibility(self,employeeId, scheduleId):
        sched = await Schedule.get(id=scheduleId, employee_id=employeeId)
        await sched.delete()
        
        
        pass
    
    
    async def get_disponibility(self, employeeId):
        sched = await Schedule.filter(employee_id=employeeId)
        
        
        results = []
        
        for each in sched:
            print(each)
            service = await Service.get(id=each.service_id)
            company = await Company.get(company_id=service.company_id)
            
            results.append({
                "id":each.id,
                "company":company.company_name,
                "service":service.name,
                "date":each.date,
                "start_time":each.start_time,
                "end_time":each.end_time,
                "status":each.status
            })
        return results