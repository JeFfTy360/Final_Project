import os


TORTOISE_ORM={
    "connections":{
        "default": f"postgres://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}",
        # Pour PostgreSQL: "postgres://user:pass@localhost:5432/dbname"
    },
    "app":{
        "Users":{
            "models":["users.models", "aerich.models"],
            "default_connection": "default"
        }
    }
}