from fastapi import APIRouter
from routers.auth_router import router as auth_routes 
from routers.company_router import router as company_routes  
from routers.employee_router import router as employee_router   
from routers.client_router import router as client_router

router = APIRouter()


router.include_router(auth_routes)
router.include_router(company_routes)
router.include_router(employee_router)
router.include_router(client_router)