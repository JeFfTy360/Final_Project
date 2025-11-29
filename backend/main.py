from fastapi import FastAPI
from fastapi import APIRouter
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE_ORM
from fastapi.middleware.cors import CORSMiddleware
from routers.router import router



app = FastAPI()

origins = [
    "http://127.0.0.1:5500",  
    "http://localhost:5500",  
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],           
)


app.include_router(router)


# configation of tortoise
register_tortoise(
    app,
    config=TORTOISE_ORM,
    add_exception_handlers=True
)