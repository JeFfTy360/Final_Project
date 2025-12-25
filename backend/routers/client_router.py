from fastapi import APIRouter, Depends,HTTPException
from services.client_services import ClientService
from utils.auth import get_current_user
from schemas.company import ListEmployeesResponse
from schemas.service import ServiceCreation
from schemas.service import ServiceModification
from models.service import Service
from schemas.client import AddAppointment

router = APIRouter(prefix="/client", tags=["Client"])
service = ClientService()


@router.get("/services")
async def get_services_for_appointment():
    return await service.get_services_for_appointment()

@router.post("/appointment/{serviceId}/{employeeId}")
async def take_appointment(appointment_data:AddAppointment, serviceId:int, employeeId:int, current_user=Depends(get_current_user),dependencies=[Depends(get_current_user)]):
    print(appointment_data)
    user_id = current_user.id
    return await service.take_appointment(user_id, serviceId, employeeId, appointment_data)


@router.get("/appointment")
async def get_client_appointment(current_user=Depends(get_current_user),dependencies=[Depends(get_current_user)]):
    user_id = current_user.id
    return await service.get_client_appointment(user_id)
    
