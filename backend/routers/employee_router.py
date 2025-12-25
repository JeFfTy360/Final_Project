from fastapi import APIRouter, Depends,HTTPException
from utils.auth import get_current_user
from services.emp_service import EmpService
from schemas.employee import EmployeeInvitation
from schemas.employee import AddSchedules

router = APIRouter(prefix="/employee", tags=["Employees"],dependencies=[Depends(get_current_user)])
service = EmpService()


@router.post("/join")
async def join_company(invitation_code: EmployeeInvitation, current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.join_enterprise(employeeId, invitation_code.code_invitation)
    
@router.get("/appointment")
async def get_employee_appointment(current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.employee_appointment(employeeId)

@router.post("/appointment/{appointmentId}/accept")
async def accept_appointment(appointmentId:int ,current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.accept_appointment(employeeId,appointmentId)

@router.post("/appointment/{appointmentId}/denied")
async def denied_appointment(appointmentId:int ,current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.denied_appointment(employeeId,appointmentId)


@router.get("/invitations")
async def get_join_request(current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.get_list_join_request(employeeId)

@router.get("/company")
async def get_company_work_for(current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.get_company_work_for(employeeId)

@router.get("/company/{companyId}")
async def get_service_work_in(companyId:int ,current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.get_service_work_in(employeeId, companyId)

@router.post("/disponibility/{serviceId}")
async def add_disponibility_for_service(schedule: AddSchedules ,serviceId:int,current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.add_disponibility_for_service(employeeId, serviceId, schedule)



@router.delete("/disponibility/{scheduleId}")
async def delete_disponibility(scheduleId:int, current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.delete_disponibility(employeeId, scheduleId)


@router.get("/disponibility")
async def get_disponibility(current_user=Depends(get_current_user)):
    employeeId = current_user.id
    return await service.get_disponibility(employeeId)
    