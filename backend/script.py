import asyncio
from tortoise import Tortoise

async def print_models():
    await Tortoise.init(
        db_url="postgres://postgres:password@db:5432/postgres",
        modules={
            "models": [
                "models.schedules",
                "models.appointments",
                "models.invitation",
                "models.CompanyEmployee",
                "models.user",
                "models.company",
                "models.employee",
                "models.service",
                "models.EmployeeService",
                "aerich.models",
            ]
        }
    )

    for app, models in Tortoise.apps.items():
        print(f"\n📦 App: {app}")
        for model in models.values():
            print(f"\nModel: {model.__name__}")
            for field_name, field in model._meta.fields_map.items():
                flags = []
                if field.pk:
                    flags.append("PK")
                if hasattr(field, "reference"):
                    flags.append("FK")

                print(
                    f"- {field_name}: {field.__class__.__name__}"
                    + (f" ({', '.join(flags)})" if flags else "")
                )

    await Tortoise.close_connections()

if __name__ == "__main__":
    asyncio.run(print_models())
