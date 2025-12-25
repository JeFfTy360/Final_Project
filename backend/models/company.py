from tortoise import fields, models

class Company(models.Model):
    company= fields.OneToOneField(
        "models.User",
        related_name="company",
        on_delete=fields.CASCADE,
        pk=True
    )
    
    company_name = fields.TextField()
    description = fields.TextField(null=True)
    address = fields.TextField(null=True)
    profil_url = fields.TextField(null=True)
    invitation_code = fields.CharField(unique=True, max_length=20, null=True)

    class Meta:
        table = "companies"
