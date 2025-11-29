from tortoise import fields, models
from utils.pwd_utils import pwd_context
from models.company import Company
from models.employee import Employee


class User(models.Model):
    """
    Model utilisateur les utilisateur sont les entreprise, les client et les employe
    """
    id = fields.BigIntField(pk=True)
    name = fields.TextField()
    password = fields.TextField()
    email = fields.CharField(max_length=255, unique=True)
    password = fields.TextField()
    phone = fields.TextField()
    is_company = fields.BooleanField(default=False)
    is_employee = fields.BooleanField(default=False)
    profil_url = fields.TextField(null=True)
    rating = fields.FloatField(default=0)
    
    #relations
    company: fields.ReverseRelation["Company"]
    employee: fields.ReverseRelation["Employee"]
    appointements_as_client: fields.ReverseRelation["Appointement"]
    
    class Meta:
        table="users"
        
    def verify_password(self, plain_password: str):
        return pwd_context.verify(plain_password, self.password)
    
    @staticmethod
    def hash_password(password:str):
        return pwd_context.hash(password)