'use client';

import React, { useEffect, useState } from "react";
import {
    Button,
    Stack,
    Typography,
    CircularProgress,
    Paper,
    Alert
} from "@mui/material";
import DashboardCard from "@/app/dash/components/DashboardCard";
import api from "@/utils/api";

const EmployeeListManager = () => {

    /* ===================== STATE ===================== */
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    /* ===================== LOAD EMPLOYEES ===================== */
    const loadEmployees = async () => {
        try {
            const res = await api.get("/companies/employees");
            setEmployees(res.data);
        } catch (err) {
            setError("Erreur lors du chargement des employés");
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    /* ===================== DELETE EMPLOYEE ===================== */
    const handleDeleteEmployee = async (employeeId) => {
        if (!employeeId) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await api.delete(`/companies/employees/${employeeId}`);

            setSuccess("Employé supprimé avec succès");
            setEmployees((prev) =>
                prev.filter((emp) => emp.id !== employeeId)
            );
        } catch (err) {
            console.error(err);
            setError("Impossible de supprimer l'employé");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== UI ===================== */
    return (
        <DashboardCard title="Employés de l'entreprise">
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={3}>

                    {employees.length === 0 && !loading && (
                        <Typography color="text.secondary">
                            Aucun employé trouvé
                        </Typography>
                    )}

                    {employees.map((emp) => (
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
                            <Stack>
                                <Typography fontWeight={600}>
                                    {emp.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {emp.email}
                                </Typography>
                                <Typography variant="body2">
                                    {emp.title}
                                </Typography>
                            </Stack>

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteEmployee(emp.id)}
                                disabled={loading}
                            >
                                Supprimer
                            </Button>
                        </Paper>
                    ))}

                    {loading && <CircularProgress />}
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                </Stack>
            </Paper>
        </DashboardCard>
    );
};

export default EmployeeListManager;
