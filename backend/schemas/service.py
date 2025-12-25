from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class ServiceCreation(BaseModel):
    name: str
    description: str
    price: float
    media_url: str
    
class ServiceModification(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    media_url: Optional[str] = None
    
    
    

    
    