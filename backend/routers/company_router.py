from fastapi import APIRouter, Depends,HTTPException
from services.comp_service import CompService
from utils.auth import get_current_user
from schemas.company import ListEmployeesResponse
from schemas.service import ServiceCreation
from schemas.service import ServiceModification

router = APIRouter(prefix="/companies", tags=["Companies"], dependencies=[Depends(get_current_user)])
service = CompService()



# gestion employer

@router.get("/employees", )
async def get_employee(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.get_all_employees(companyId)
    
@router.get("/invitations")
async def get_invitations(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.get_all_invitations(companyId)  


# ----------------------------ok---------------------------------

@router.post("/accept/{invitationId}")
async def accept_invitation(invitationId: int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.accept_invitation(companyId, invitationId)

@router.post("/denied/{invitationId}")
async def denied_invitation(invitationId: int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.denied_invitation(companyId, invitationId)

@router.delete("/employees/{employeeId}")
async def remove_employee(employeeId: int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.remove_employee(companyId, employeeId)



# statistique

@router.get("/statistics")
async def general_statistics(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.general_stat(companyId)

@router.get("/days/statistics-appointments")
async def appointment_statistics(current_user=Depends(get_current_user),month: int = 1):
    companyId = current_user.id
    return await service.stat_by_data(companyId, month)

@router.get("/rates/employee-by-service")
async def rate_employees_by_services(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.rate_employees_by_services(companyId)
    
@router.get("/statistics-by-employees")
async def statistics_per_employee(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.statistics_per_employee(companyId)

@router.get("/statistics/rate-employees")
async def rate_per_employeee(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.rate_per_employee(companyId)

@router.get("/statistics/rate-company")
async def rate_company(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.rate_company(companyId)



@router.get("/code")
async def get_code_company(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.get_code_invitation_company(companyId)


@router.post("/genrate-code")
async def generate_code_company(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.generate_code_company(companyId)

# @router.get("/{companyId}")
# async def get_profil_company(companyId:int):
#     return await service.profil_company(companyId)




# -------------------------------service section------------------------

@router.get("/services")
async def get_service(current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.get_service(companyId)

@router.post("/services")
async def add_service(service_data: ServiceCreation ,current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.add_service(companyId, service_data)

@router.put("/services/{serviceId}")
async def put_service(serviceId: int, service_data: ServiceModification , current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.put_service(companyId, serviceId, service_data )

@router.delete("/services/{serviceId}")
async def delete_service(serviceId: int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.delete_service(companyId, serviceId)

@router.post("/services/{serviceId}/{employeeId}")
async def add_employee_to_service(serviceId:int, employeeId: int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.add_employee_to_service(companyId, serviceId, employeeId)
    
@router.delete("/delete/services/{serviceId}/{employeeId}")
async def remove_employee_to_service(serviceId:int,employeeId:int, current_user=Depends(get_current_user)):
    return await service.remove_employee_to_service(employeeId, serviceId, )


@router.get("/employee-from-service/{serviceId}")
async def get_employee_from_service(serviceId:int, current_user=Depends(get_current_user)):
    companyId = current_user.id
    return await service.get_employee_from_service(companyId, serviceId)