from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    phone:str
    is_company: Optional[bool] = False
    is_employee: Optional[bool] = False
    company_name: Optional[str] = None
    company_description: Optional[str] = None
    company_address: Optional[str] = None 
    employee_bio: Optional[str] = None
    employee_title: Optional[str] = None
    
    
    @model_validator(mode="after")
    def validate_company_fields(self):
        if self.is_company:
            missing = []
            
            if not self.company_description:
                missing.append("company_description")
            if not self.company_address:
                missing.append("company_address")
            if not self.company_name:
                missing.append("company_name")
            if missing:
                raise ValueError(f"Missing fields for company registration: {', '.join(missing)}")
        return self
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str 
    
    
    
class CurrentUser(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    is_company: bool
    is_employee: bool
    