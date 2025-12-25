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
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating
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

    /* ===== MODAL NOTE ===== */
    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    /* ===================== LOAD ===================== */
    const loadAppointments = async () => {
        try {
            setLoading(true);
            const res = await api.get('/client/appointment');
            setAppointments(res.data);
        } catch {
            setError("Erreur lors du chargement des rendez-vous");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    /* ===================== CANCEL ===================== */
    const cancelAppointment = async (id) => {
        try {
            await api.post(`/client/appointment/${id}/cancel`);
            setAppointments((prev) =>
                prev.map((a) =>
                    a.id === id ? { ...a, status: 'cancelled' } : a
                )
            );
            setSuccess('Rendez-vous annulé');
        } catch {
            setError("Impossible d'annuler le rendez-vous");
        }
    };

    /* ===================== REVIEW ===================== */
    const submitReview = async () => {
        try {
            await api.post(
                `/client/appointment/${selectedAppointment.id}/review`,
                { rating, comment }
            );
            setSuccess('Merci pour votre note !');
            setOpen(false);
            setRating(0);
            setComment('');
        } catch {
            setError("Impossible d'envoyer la note");
        }
    };

    /* ===================== HELPERS ===================== */
    const formatTime = (time) => {
        if (!time) return '--:--';
        return time.slice(0, 5);
    };

    const isPastAppointment = (date) => {
        return dayjs(date).isBefore(dayjs(), 'day');
    };

    const statusLabel = (status) => {
        switch (status) {
            case 'accepted':
                return 'Confirmé';
            case 'pending':
                return 'En attente';
            case 'cancelled':
                return 'Annulé';
            case 'completed':
                return 'Terminé';
            default:
                return status;
        }
    };

    const statusColor = (status) => {
        switch (status) {
            case 'accepted':
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
        <DashboardCard title="Mes rendez-vous">
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
                                    📅 {dayjs(a.date).format('DD/MM/YYYY')}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    ⏰ {formatTime(a.start_time)} → {formatTime(a.end_time)}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    📍 {a.address}
                                </Typography>

                                <Chip
                                    label={statusLabel(a.status)}
                                    color={statusColor(a.status)}
                                    sx={{ width: 'fit-content' }}
                                />

                                {/* ===== ACTIONS ===== */}
                                <Divider />

                                {!['cancelled', 'completed'].includes(a.status) && (
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => cancelAppointment(a.id)}
                                    >
                                        Annuler
                                    </Button>
                                )}

                                {isPastAppointment(a.date) && a.status === 'accepted' && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => {
                                            setSelectedAppointment(a);
                                            setOpen(true);
                                        }}
                                    >
                                        Noter ce rendez-vous
                                    </Button>
                                )}
                            </Stack>
                        </Paper>
                    ))}

                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                </Stack>
            </Paper>

            {/* ===================== MODAL NOTE ===================== */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Noter le rendez-vous</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <Rating
                            value={rating}
                            onChange={(e, value) => setRating(value)}
                        />

                        <TextField
                            label="Commentaire"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={submitReview}
                        disabled={!rating}
                    >
                        Envoyer
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

export default AppointmentsList;
