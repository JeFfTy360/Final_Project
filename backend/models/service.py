from tortoise import fields, models




class Service(models.Model):
    id = fields.IntField(pk=True)
    company = fields.ForeignKeyField(
        "models.User", 
        related_name="services", 
        on_delete=fields.CASCADE,
        source_field="company_id"
    )
    
    
    name = fields.TextField()
    description = fields.TextField()
    price = fields.FloatField()
    media_url = fields.TextField()
    
    image = fields.BinaryField(null=True)

    employee_services: fields.ReverseRelation["EmployeeService"]
    appointments: fields.ReverseRelation["Appointment"]

    class Meta:
        table = "services"
