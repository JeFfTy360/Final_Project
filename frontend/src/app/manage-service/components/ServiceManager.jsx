'use client';

import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Stack,
    Typography,
    CircularProgress,
    Paper,
    Alert,
    MenuItem,
    Divider
} from "@mui/material";
import DashboardCard from "@/app/dash/components/DashboardCard";
import api from "@/utils/api";

const ServiceManager = () => {

    /* ===================== STATE ===================== */
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [serviceEmployees, setServiceEmployees] = useState([]);

    const [selectedService, setSelectedService] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        media_url: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    /* ===================== LOAD DATA ===================== */
    const loadServices = async () => {
        const res = await api.get("/companies/services");
        setServices(res.data);
    };

    const loadEmployees = async () => {
        const res = await api.get("/companies/employees");
        setEmployees(res.data);
    };

    const loadEmployeesFromService = async (serviceId) => {
        if (!serviceId) return;

        const res = await api.get(
            `/companies/employee-from-service/${serviceId}`
        );
        setServiceEmployees(res.data);
    };

    useEffect(() => {
        loadServices();
        loadEmployees();
    }, []);

    useEffect(() => {
        loadEmployeesFromService(selectedService);
    }, [selectedService]);

    /* ===================== ADD SERVICE ===================== */
    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.post("/companies/services", {
                ...formData,
                price: parseFloat(formData.price),
            });

            setSuccess("Service ajouté avec succès");
            setFormData({
                name: "",
                description: "",
                price: "",
                media_url: "",
            });

            loadServices();
        } catch (err) {
            setError("Erreur lors de l'ajout du service");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== DELETE SERVICE ===================== */
    const handleDeleteService = async (serviceId) => {
        if (!serviceId) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.delete(`/companies/services/${serviceId}`);

            setSuccess("Service supprimé avec succès");
            setServices((prev) => prev.filter(s => s.id !== serviceId));

            if (selectedService === serviceId) {
                setSelectedService("");
                setServiceEmployees([]);
            }
        } catch (err) {
            console.error(err);
            setError("Impossible de supprimer le service");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== ADD EMPLOYEE ===================== */
    const handleAddEmployeeToService = async () => {
        if (!selectedService || !selectedEmployee) {
            setError("Veuillez sélectionner un service et un employé");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.post(
                `/companies/services/${selectedService}/${selectedEmployee}`
            );

            setSuccess("Employé ajouté au service");
            loadEmployeesFromService(selectedService);
        } catch (err) {
            setError("Impossible d'ajouter l'employé");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== REMOVE EMPLOYEE ===================== */
    const handleRemoveEmployeeFromService = async (employeeId) => {
        if (!selectedService || !employeeId) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.delete(
                `/companies/delete/services/${employeeId}/${selectedService}`
            );

            setSuccess("Employé retiré du service");
            loadEmployeesFromService(selectedService);
        } catch (err) {
            console.error(err);
            setError("Impossible de retirer l'employé");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== UI ===================== */
    return (
        <DashboardCard title="Gestion des services">
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={4}>

                    {/* ===== ADD SERVICE ===== */}
                    <Typography variant="h6">Ajouter un service</Typography>

                    <form onSubmit={handleAddService}>
                        <Stack spacing={2}>
                            <TextField
                                label="Nom"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />

                            <TextField
                                label="Description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                multiline
                                rows={3}
                                required
                            />

                            <TextField
                                label="Prix"
                                type="number"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e.target.value })
                                }
                                required
                            />

                            <TextField
                                label="URL média"
                                value={formData.media_url}
                                onChange={(e) =>
                                    setFormData({ ...formData, media_url: e.target.value })
                                }
                            />

                            <Button type="submit" variant="contained" disabled={loading}>
                                Ajouter le service
                            </Button>
                        </Stack>
                    </form>

                    <Divider />

                    {/* ===== LISTE DES SERVICES ===== */}
                    <Typography variant="h6">Liste des services</Typography>

                    <Stack spacing={2}>
                        {services.map((service) => (
                            <Paper
                                key={service.id}
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderRadius: 2
                                }}
                            >
                                <Stack>
                                    <Typography fontWeight={600}>
                                        {service.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {service.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        Prix : {service.price}
                                    </Typography>
                                </Stack>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteService(service.id)}
                                >
                                    Supprimer
                                </Button>
                            </Paper>
                        ))}
                    </Stack>

                    <Divider />

                    {/* ===== ASSIGN EMPLOYEE ===== */}
                    <Typography variant="h6">
                        Assigner un employé à un service
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            select
                            label="Service"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                        >
                            {services.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Employé"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                        >
                            {employees.map((emp) => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.name} - {emp.email}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button variant="contained" onClick={handleAddEmployeeToService}>
                            Assigner
                        </Button>
                    </Stack>

                    <Divider />

                    {/* ===== SERVICE EMPLOYEES ===== */}
                    <Typography variant="h6">Employés du service</Typography>

                    {serviceEmployees.length === 0 ? (
                        <Typography color="text.secondary">
                            Aucun employé pour ce service
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {serviceEmployees.map((emp) => (
                                <Paper
                                    key={emp.id}
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderRadius: 2
                                    }}
                                >
                                    <Typography>
                                        {emp.name} - {emp.email}
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() =>
                                            handleRemoveEmployeeFromService(emp.id)
                                        }
                                    >
                                        Retirer
                                    </Button>
                                </Paper>
                            ))}
                        </Stack>
                    )}

                    {loading && <CircularProgress />}
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                </Stack>
            </Paper>
        </DashboardCard>
    );
};

export default ServiceManager;
