import secrets
from models.user import User
from schemas.auth import *
from models.company import Company
from models.employee import Employee
from fastapi import HTTPException,Request
from datetime import timedelta
from utils.auth import create_access_token, create_refresh_token, verify_refresh_token
from fastapi import Response
from schemas.auth import CurrentUser
from jose import jwt, JWTError
from utils.auth import SECRET_KEY, ALGORITHM, EXPIRE_TIME_ACCESS_TOKEN_MINUTES, EXPIRE_TIME_REFRESH_TOKEN_DAYS

class AuthService:
    
    async def create_user(self, user_data: UserRegister):
        hashed_password = User.hash_password(user_data.password)
        
        user = await User.create(
            name= user_data.name,
            email= user_data.email,
            password= hashed_password,
            phone= user_data.phone,
            is_company= user_data.is_company,
            is_employee= user_data.is_employee,)
        
        if user_data.is_company:
            await Company.create(
                company_name= user_data.company_name,
                description= user_data.company_description,
                address= user_data.company_address,
                user= user
            )
            return {"message": "User-Company created successfully"}
        
        if user_data.is_employee:
            await Employee.create(
                bio= user_data.employee_bio,
                title= user_data.employee_title,
                user= user
            )
            return {"message": "User-Employee created successfully"}

        return {"message": "User created successfully"}

        
    async def login_user(self, user_data, response: Response):
        user = await User.get_or_none(email=user_data.email)
        if not user or not user.verify_password(user_data.password):
            raise HTTPException(status_code=401, detail="Incorrect username or password")
        
        access_token = create_access_token(data={"sub": user.email},expires_delta=timedelta(minutes=EXPIRE_TIME_ACCESS_TOKEN_MINUTES))
        
        refresh_token = create_refresh_token(data={"sub": user.email},expires_delta=timedelta(days=EXPIRE_TIME_REFRESH_TOKEN_DAYS))
        
        response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,           
        secure=False,             
        samesite="lax",           
        max_age=EXPIRE_TIME_ACCESS_TOKEN_MINUTES*60,
        path="/",)
        
        response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,           
        secure=False,             
        samesite="lax",           
        max_age=60 * 60 * 24 * EXPIRE_TIME_REFRESH_TOKEN_DAYS,
        path="/")
        
        
        return {"message": "Login successful"}    


    async def logout_user(self, response: Response):
        response.delete_cookie(key="access_token",path="/",samesite="lax")
        response.delete_cookie(key="refresh_token",path="/",samesite="lax")
        return {"message": "Logout successful"}
    
    
    async def refresh_access_token(self, request: Request, response: Response):
        refresh_token = request.cookies.get("refresh_token")

        if not refresh_token:
            raise HTTPException(status_code=401, detail="Refresh token missing")

        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
            if payload.get("type") != "refresh":
                raise HTTPException(status_code=401, detail="Invalid token type")

            user_id = payload.get("sub")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        # Générer un nouveau access token
        new_access_token = create_access_token({"sub": str(user_id)}, expires_delta=timedelta(minutes=EXPIRE_TIME_ACCESS_TOKEN_MINUTES))

        # ROTATION DU REFRESH TOKEN
        new_refresh_token = create_refresh_token({"sub": str(user_id)}, expires_delta=timedelta(days=EXPIRE_TIME_REFRESH_TOKEN_DAYS))

        # Mettre les cookies à jour
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            max_age=EXPIRE_TIME_ACCESS_TOKEN_MINUTES*60,
        )

        response.set_cookie(
            key="refresh_token",
            value=new_refresh_token,
            httponly=True,
            max_age=3600 * 24 * EXPIRE_TIME_REFRESH_TOKEN_DAYS
        )

        return {"message": "Login successful"}
        # return {
        #     "access_token": new_access_token,
        #     "refresh_token": new_refresh_token
        # }

    
    async def get_me(self, current_user: CurrentUser):
        return current_user