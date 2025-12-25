from tortoise import fields, models


class Schedule(models.Model):
    employee = fields.ForeignKeyField(
        "models.User",
        on_delete=fields.CASCADE,
        related_name="schedules_employees",
    )
    service = fields.ForeignKeyField(
        "models.Service",
        on_delete=fields.CASCADE,
        related_name="schedules_services"
    )
    
    status = fields.CharField(null=True, max_length=20)
    
    date = fields.DateField()
    
    start_time = fields.TimeField()
    
    end_time = fields.TimeField()
    