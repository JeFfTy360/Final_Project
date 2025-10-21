from tortoise import fields
from tortoise import Model


class Users(Model):
    id = fields.IntField(pk=True)
    first_name = fields.CharField(max_length=200, null=False)
    last_name = fields.CharField(max_length=200, null=False)
    username = fields.CharField(max_length=200, null=False)
    email = fields.CharField(unique=True, null=False, max_length=255)
    password = fields.CharField(max_length=32, null=False)
    phone_number = fields.CharField(max_length=20, null=False)
    # is_active = fields.Boolean()
    
    
    class Meta: 
        table = "users"
        

class Roles(Model):
    id=fields.IntField(pk=True)
    name=fields.CharField(max_length=50, null=False)
    
class Permissions(Model):
    id=fields.IntField(pk=True)
    name=fields.CharField(max_length=200, null=False)
    
class Group(Model):
    id=fields.IntField(pk=True)
    name=fields.CharField(max_length=150, null=False)
    
