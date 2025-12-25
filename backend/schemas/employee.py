from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date as date_, time


class EmployeeInvitation(BaseModel):
    code_invitation: str
    
    
class AddSchedules(BaseModel):
    date : date_
    start_time: time
    end_time: time
    