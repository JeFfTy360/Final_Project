from tortoise import fields, models

class Employee(models.Model):
    """
    Model Employee representing an employee entity.
    """
    id = fields.BigIntField(pk=True)
    bio = fields.TextField(null=True)
    title = fields.TextField(null=True)
    profile_url = fields.TextField(null=True)
    
    # relations
    user: fields.OneToOneRelation["User"] = fields.OneToOneField(
        "models.User", related_name="employee", on_delete=fields.CASCADE
    )
    
    class Meta:
        table="employees"