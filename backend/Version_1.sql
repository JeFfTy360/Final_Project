CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "is_company" BOOLEAN NOT NULL,
    "is_employee" BOOLEAN NOT NULL,
    "profil_url" TEXT NOT NULL,
    "rating" FLOAT(53) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "companies"(
    "id" BIGINT NOT NULL,
    "company_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profil_url" TEXT NOT NULL,
    "invitation_code" BIGINT NOT NULL
);
ALTER TABLE
    "companies" ADD PRIMARY KEY("id");
ALTER TABLE
    "companies" ADD CONSTRAINT "companies_invitation_code_unique" UNIQUE("invitation_code");
CREATE TABLE "services"(
    "id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" FLOAT(53) NOT NULL,
    "media_url" TEXT NOT NULL
);
ALTER TABLE
    "services" ADD PRIMARY KEY("id");
CREATE TABLE "employee_services"(
    "id" BIGINT NOT NULL,
    "service_id" BIGINT NOT NULL,
    "employee_id" BIGINT NOT NULL
);
ALTER TABLE
    "employee_services" ADD PRIMARY KEY("id");
CREATE TABLE "company_employees"(
    "id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "employee_id" BIGINT NOT NULL
);
ALTER TABLE
    "company_employees" ADD PRIMARY KEY("id");
CREATE TABLE "schedules"(
    "id" BIGINT NOT NULL,
    "employee_id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "schedules" ADD PRIMARY KEY("id");
CREATE TABLE "employees"(
    "id" BIGINT NOT NULL,
    "bio" BIGINT NOT NULL,
    "title" BIGINT NOT NULL,
    "profil_url" BIGINT NOT NULL
);
ALTER TABLE
    "employees" ADD PRIMARY KEY("id");
CREATE TABLE "employees_porfolio"(
    "id" BIGINT NOT NULL,
    "employee_id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "number_like" BIGINT NOT NULL,
    "media_url" TEXT NOT NULL
);
ALTER TABLE
    "employees_porfolio" ADD PRIMARY KEY("id");
CREATE TABLE "appointments"(
    "id" BIGINT NOT NULL,
    "client_id" BIGINT NOT NULL,
    "employee_id" BIGINT NOT NULL,
    "service_id" BIGINT NOT NULL,
    "start_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "date" DATE NOT NULL,
    "rating" FLOAT(53) NULL
);
ALTER TABLE
    "appointments" ADD PRIMARY KEY("id");
ALTER TABLE
    "company_employees" ADD CONSTRAINT "company_employees_employee_id_foreign" FOREIGN KEY("employee_id") REFERENCES "employees"("id");
ALTER TABLE
    "schedules" ADD CONSTRAINT "schedules_employee_id_foreign" FOREIGN KEY("employee_id") REFERENCES "employees"("id");
ALTER TABLE
    "employees" ADD CONSTRAINT "employees_id_foreign" FOREIGN KEY("id") REFERENCES "users"("id");
ALTER TABLE
    "employee_services" ADD CONSTRAINT "employee_services_service_id_foreign" FOREIGN KEY("service_id") REFERENCES "services"("id");
ALTER TABLE
    "companies" ADD CONSTRAINT "companies_id_foreign" FOREIGN KEY("id") REFERENCES "users"("id");
ALTER TABLE
    "company_employees" ADD CONSTRAINT "company_employees_company_id_foreign" FOREIGN KEY("company_id") REFERENCES "companies"("id");
ALTER TABLE
    "employee_services" ADD CONSTRAINT "employee_services_employee_id_foreign" FOREIGN KEY("employee_id") REFERENCES "employees"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_client_id_foreign" FOREIGN KEY("client_id") REFERENCES "users"("id");
ALTER TABLE
    "schedules" ADD CONSTRAINT "schedules_company_id_foreign" FOREIGN KEY("company_id") REFERENCES "companies"("id");
ALTER TABLE
    "services" ADD CONSTRAINT "services_company_id_foreign" FOREIGN KEY("company_id") REFERENCES "companies"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_service_id_foreign" FOREIGN KEY("service_id") REFERENCES "services"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_employee_id_foreign" FOREIGN KEY("employee_id") REFERENCES "employees"("id");
ALTER TABLE
    "employees_porfolio" ADD CONSTRAINT "employees_porfolio_employee_id_foreign" FOREIGN KEY("employee_id") REFERENCES "employees"("id");