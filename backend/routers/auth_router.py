from fastapi import APIRouter, FastAPI
from services.auth_services import AuthService
from schemas.auth import UserRegister, UserLogin, CurrentUser
from utils.auth import get_current_user
from fastapi import Response, Request, Depends
from models.user import User

router = APIRouter(prefix="/auth",tags=["Authentication"])

service = AuthService()




@router.post("/register")
async def register(user_data: UserRegister):
    return await service.create_user(user_data)


@router.post("/login")
async def login(user_data:UserLogin, response:Response):
    return await service.login_user(user_data, response)  


@router.post("/logout")
async def logout(response:Response):
    return await service.logout_user(response)

@router.get("/refresh-token")
async def refresh_token(request:Request, response:Response):
    return await service.refresh_access_token(request, response)


@router.get("/me", response_model=CurrentUser)
async def get_me(current_user: User = Depends(get_current_user)):
    return await service.get_me(current_user)





