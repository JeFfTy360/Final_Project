from tortoise import models, fields


class EmployeeService(models.Model):
    id = fields.IntField(pk=True)
    
    employee = fields.ForeignKeyField(
        "models.User",
        related_name="employee_services", 
        on_delete=fields.CASCADE
    )
    
    service = fields.ForeignKeyField(
        "models.Service",
        related_name="service_employee",
        on_delete=fields.CASCADE
    )
    
    class Meta:
        table = "employee_services"
        unique_together = (("employee", "service"))