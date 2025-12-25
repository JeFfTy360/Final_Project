'use client';

import React, { useEffect, useState } from 'react';
import {
    Stack,
    Typography,
    Paper,
    Alert,
    CircularProgress,
    Button,
    Chip,
    Divider
} from '@mui/material';

import dayjs from 'dayjs';
import DashboardCard from '@/app/dash/components/DashboardCard';
import api from '@/utils/api';

const AppointmentsList = () => {

    /* ===================== STATE ===================== */
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    /* ===================== UTILS ===================== */
    const formatTime = (time) => {
        if (!time) return '--:--';
        return time.slice(0, 5); // "09:00:00+00:00" → "09:00"
    };

    /* ===================== LOAD ===================== */
    const loadAppointments = async () => {
        try {
            setLoading(true);
            const res = await api.get('/employee/appointment');
            setAppointments(res.data);
        } catch (err) {
            setError("Erreur lors du chargement des rendez-vous");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    /* ===================== ACCEPT ===================== */
    const acceptAppointment = async (id) => {
        try {
            await api.post(`/employee/appointment/${id}/accept`);
            setAppointments((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: 'confirmed' } : a
                )
            );
            setSuccess('Rendez-vous accepté');
        } catch {
            setError("Impossible d'accepter le rendez-vous");
        }
    };

    /* ===================== DENY ===================== */
    const denyAppointment = async (id) => {
        try {
            await api.post(`/employee/appointment/${id}/denied`);
            setAppointments((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: 'cancelled' } : a
                )
            );
            setSuccess('Rendez-vous refusé');
        } catch {
            setError("Impossible de refuser le rendez-vous");
        }
    };

    /* ===================== STATUS COLOR ===================== */
    const statusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'success';
            case 'cancelled':
                return 'error';
            case 'completed':
                return 'primary';
            default:
                return 'warning';
        }
    };

    /* ===================== UI ===================== */
    return (
        <DashboardCard title="Rendez-vous">
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={3}>

                    {loading && <CircularProgress />}

                    {!loading && appointments.length === 0 && (
                        <Typography color="text.secondary">
                            Aucun rendez-vous trouvé
                        </Typography>
                    )}

                    {appointments.map((a) => (
                        <Paper key={a.id} sx={{ p: 2 }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle1">
                                    {a.service_name} — {a.company_name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Client : {a.client}
                                </Typography>

                                {/* DATE */}
                                <Typography variant="body2" color="text.secondary">
                                    📅 {dayjs(a.date).format('DD/MM/YYYY')}
                                </Typography>

                                {/* HEURE */}
                                <Typography variant="body2" color="text.secondary">
                                    ⏰ {formatTime(a.start_time)} → {formatTime(a.end_time)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    📍 {a.address}
                                </Typography>

                                <Chip
                                    label={a.status}
                                    color={statusColor(a.status)}
                                    sx={{ width: 'fit-content' }}
                                />

                                {a.status === 'pending' && (
                                    <>
                                        <Divider />
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                size="small"
                                                color="success"
                                                onClick={() => acceptAppointment(a.id)}
                                            >
                                                Accepter
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => denyAppointment(a.id)}
                                            >
                                                Refuser
                                            </Button>
                                        </Stack>
                                    </>
                                )}
                            </Stack>
                        </Paper>
                    ))}

                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                </Stack>
            </Paper>
        </DashboardCard>
    );
};

export default AppointmentsList;
