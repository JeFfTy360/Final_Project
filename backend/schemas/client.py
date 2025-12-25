from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional
from datetime import date as date_, time

class AddAppointment(BaseModel):
    starttime: time
    endtime: time
    date: date_

    
