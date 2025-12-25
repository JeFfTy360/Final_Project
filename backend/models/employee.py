from tortoise import fields, models
class Employee(models.Model):
    employee = fields.OneToOneField(
        "models.User",
        related_name="employee",
        on_delete=fields.CASCADE,
        pk=True
    )

    bio = fields.TextField(null=True)
    title = fields.TextField(null=True)
    profile_url = fields.TextField(null=True)
    rating_employee = fields.FloatField(null=True)

    class Meta:
        table = "employees"
