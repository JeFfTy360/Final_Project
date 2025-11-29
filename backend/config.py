import os


TORTOISE_ORM={
    "connections":{
        "default": f"postgres://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}",
        # "default": "postgres://user:pass@localhost:5432/dbname" #postgresql connection string
    },
    "apps": {
        "models": {
            "models": [
                "models.user",
                "models.company",
                "models.employee",
                "aerich.models"
            ],
            "default_connection": "default",
        },
    },
}