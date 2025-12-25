from tortoise import fields
from tortoise.models import Model


class User(Model):
    id = fields.BigIntField(pk=True)
    name = fields.TextField()
    email = fields.TextField()
    password = fields.TextField()
    created_at = fields.DateField()
    updated_at = fields.DateField()
    phone = fields.TextField()
    is_company = fields.BooleanField()
    is_employee = fields.BooleanField()
    profil_url = fields.TextField()
    rating = fields.FloatField()

    class Meta:
        table = "users"


class Company(Model):
    id = fields.OneToOneField("models.User", related_name="company", pk=True, on_delete=fields.CASCADE)
    company_name = fields.TextField()
    description = fields.TextField()
    address = fields.TextField()
    profil_url = fields.TextField()
    invitation_code = fields.BigIntField(unique=True)

    class Meta:
        table = "companies"


class Employee(Model):
    id = fields.OneToOneField("models.User", related_name="employee", pk=True, on_delete=fields.CASCADE)
    bio = fields.BigIntField()
    title = fields.BigIntField()
    profil_url = fields.BigIntField()

    class Meta:
        table = "employees"


class Service(Model):
    id = fields.BigIntField(pk=True)
    company = fields.ForeignKeyField("models.Company", related_name="cs",  on_delete=fields.CASCADE)
    name = fields.TextField()
    description = fields.TextField()
    price = fields.FloatField()
    media_url = fields.TextField()

    class Meta:
        table = "services"


class Appointment(Model):
    id = fields.BigIntField(pk=True)
    client = fields.ForeignKeyField("models.User", related_name="appointments", on_delete=fields.CASCADE)
    employee = fields.ForeignKeyField("models.Employee", related_name="appointments", on_delete=fields.CASCADE)
    service = fields.ForeignKeyField("models.Service", related_name="appointments", on_delete=fields.CASCADE)
    start_time = fields.DatetimeField()
    end_time = fields.DatetimeField()
    date = fields.DateField()
    rating = fields.FloatField(null=True)

    class Meta:
        table = "appointments"


class CompanyEmployee(Model):
    id = fields.BigIntField(pk=True)
    company = fields.ForeignKeyField("models.Company", related_name="company_employees", on_delete=fields.CASCADE)
    employee = fields.ForeignKeyField("models.Employee", related_name="company_employees", on_delete=fields.CASCADE)

    class Meta:
        table = "company_employees"


class EmployeeService(Model):
    id = fields.BigIntField(pk=True)
    service = fields.ForeignKeyField("models.Service", related_name="employee_services", on_delete=fields.CASCADE)
    employee = fields.ForeignKeyField("models.Employee", related_name="employee_services", on_delete=fields.CASCADE)

    class Meta:
        table = "employee_services"


class EmployeePortfolio(Model):
    id = fields.BigIntField(pk=True)
    employee = fields.ForeignKeyField("models.Employee", related_name="portfolio", on_delete=fields.CASCADE)
    title = fields.TextField()
    description = fields.TextField()
    number_like = fields.BigIntField()
    media_url = fields.TextField()

    class Meta:
        table = "employees_porfolio"


class Invitation(Model):
    id = fields.BigIntField(pk=True)
    company = fields.ForeignKeyField("models.Company", related_name="invitations", on_delete=fields.CASCADE)
    employee = fields.ForeignKeyField("models.Employee", related_name="invitations", on_delete=fields.CASCADE)
    created_at = fields.DateField()
    status = fields.TextField()
    updated_at = fields.DateField()

    class Meta:
        table = "invitations"


class Schedule(Model):
    id = fields.BigIntField(pk=True)
    employee = fields.ForeignKeyField("models.Employee", related_name="schedules", on_delete=fields.CASCADE)
    service = fields.ForeignKeyField("models.Service", related_name="schedules", on_delete=fields.CASCADE)
    date = fields.DateField()
    start_time = fields.DatetimeField()
    end_time = fields.DatetimeField()

    class Meta:
        table = "schedules"