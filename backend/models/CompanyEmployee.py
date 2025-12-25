from tortoise import models, fields

class CompanyEmployee(models.Model):
    id = fields.IntField(pk=True)


    company = fields.ForeignKeyField(
        "models.User", 
        related_name="companies_employees",
        on_delete=fields.CASCADE,    
    )

    employee = fields.ForeignKeyField(
        "models.User",
        on_delete=fields.CASCADE,
        related_name="employees_companies",
    )

    class Meta:
        table = "company_employees"
        unique_together = (("company", "employee"),)
