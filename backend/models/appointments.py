from tortoise import models, fields


class Appointment(models.Model):
    """
    Appointment model representing a booking between a client and an employee
    for a specific service at a specific time.
    """

    id = fields.BigIntField(pk=True)

    # Foreign keys
    client = fields.ForeignKeyField(
        "models.User",
        related_name="client_appointments",
        source_field="client_id"
    )

    employee = fields.ForeignKeyField(
        "models.User",
        related_name="employee_appointments",
        source_field="employee_id"
    )

    service = fields.ForeignKeyField(
        "models.Service",
        related_name="service_appointments",
        source_field="service_id"
    )
    
    status = fields.CharField(max_length=20, default="pending")

    # Time info
    start_time = fields.TimeField()
    end_time = fields.TimeField()
    date = fields.DateField()

    # Nullable rating
    rating = fields.FloatField(null=True)

    class Meta:
        table = "appointments"

