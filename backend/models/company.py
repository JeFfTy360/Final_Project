from tortoise import fields, models


class Company(models.Model):
    """
    Model Company representing a company entity.
    """
    id = fields.BigIntField(pk=True)
    company_name = fields.TextField()
    description = fields.TextField(null=True)
    address = fields.TextField(null=True)
    profil_url = fields.TextField(null=True)
    
    # relations
    user: fields.ForeignKeyRelation["User"] = fields.ForeignKeyField(
        "models.User", related_name="company", on_delete=fields.CASCADE
    )
    
    class Meta:
        table="companies"