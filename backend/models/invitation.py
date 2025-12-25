from tortoise import fields, models

class Invitation(models.Model):
    id = fields.BigIntField(pk=True)
    
    company = fields.ForeignKeyField(
        "models.User",
        related_name="company_invitations",
        on_delete=fields.RESTRICT
    )

    employee = fields.ForeignKeyField(
        "models.User",
        related_name="employee_invitations",
        on_delete=fields.RESTRICT
    )

    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    status = fields.CharField(max_length=20, default="pending")

    class Meta:
        table = "invitations"
