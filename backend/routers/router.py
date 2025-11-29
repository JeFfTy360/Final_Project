from fastapi import APIRouter
from routers.auth_router import router as auth_routes 


router = APIRouter()


router.include_router(auth_routes)