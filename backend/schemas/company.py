from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional

class ListEmployeesResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    employee_bio: Optional[str] = None
    employee_title: Optional[str] = None
    
