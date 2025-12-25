'use client';

import React, { useEffect, useState } from 'react';
import {
    Stack,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    MenuItem,
    CircularProgress,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import DashboardCard from '@/app/dash/components/DashboardCard';
import api from '@/utils/api';

const EmployeeAvailabilityManager = () => {

    /* ===================== STATE ===================== */
    const [companies, setCompanies] = useState([]);
    const [services, setServices] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);

    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    /* ===== MODAL DELETE ===== */
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    /* ===================== LOAD DATA ===================== */
    useEffect(() => {
        loadCompanies();
        loadAvailabilities();
    }, []);

    const loadCompanies = async () => {
        try {
            const res = await api.get('/employee/company');
            setCompanies(res.data);
        } catch {
            setError("Erreur lors du chargement des entreprises");
        }
    };

    const loadServices = async (companyId) => {
        try {
            const res = await api.get(`/employee/company/${companyId}`);
            setServices(res.data);
        } catch {
            setError("Erreur lors du chargement des services");
        }
    };

    const loadAvailabilities = async () => {
        try {
            const res = await api.get('/employee/disponibility');
            setAvailabilities(res.data);
        } catch {
            setError("Erreur lors du chargement des disponibilités");
        }
    };

    /* ===================== HANDLERS ===================== */
    const handleCompanyChange = (companyId) => {
        setSelectedCompany(companyId);
        setSelectedService('');
        setServices([]);
        if (companyId) loadServices(companyId);
    };

    /* ===== CALENDAR SELECT ===== */
    const handleSelect = (info) => {
        const start = dayjs(info.start);
        const end = dayjs(info.end);

        if (start.isBefore(dayjs())) {
            setError("Impossible de sélectionner un créneau dans le passé");
            return;
        }

        if (end.diff(start, 'minute') < 30) {
            setError("La durée minimale est de 30 minutes");
            return;
        }

        setError('');
        setSelectedDate(start.format('YYYY-MM-DD'));
        setStartDateTime(start);
        setEndDateTime(end);
    };

    /* ===================== ADD DISPONIBILITY ===================== */
    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        if (!selectedService || !startDateTime || !endDateTime || !selectedDate) {
            setError("Veuillez sélectionner un service et un créneau horaire");
            return;
        }

        setLoading(true);

        try {
            await api.post(`/employee/disponibility/${selectedService}`, {
                date: selectedDate,
                start_time: startDateTime.format('HH:mm'),
                end_time: endDateTime.format('HH:mm')
            });

            setSuccess("Disponibilité ajoutée avec succès");
            setSelectedDate(null);
            setStartDateTime(null);
            setEndDateTime(null);
            loadAvailabilities();
        } catch {
            setError("Erreur lors de l'ajout de la disponibilité");
        } finally {
            setLoading(false);
        }
    };

    /* ===================== DELETE DISPONIBILITY ===================== */
    const openDeleteDialog = (schedule) => {
        setSelectedSchedule(schedule);
        setOpenDeleteModal(true);
    };

    const closeDeleteDialog = () => {
        setOpenDeleteModal(false);
        setSelectedSchedule(null);
    };

    const confirmDelete = async () => {
        if (!selectedSchedule) return;

        try {
            await api.delete(`/employee/disponibility/${selectedSchedule.id}`);
            setSuccess("Disponibilité supprimée avec succès");
            loadAvailabilities();
        } catch {
            setError("Erreur lors de la suppression");
        } finally {
            closeDeleteDialog();
        }
    };

    /* ===================== UI ===================== */
    return (
        <DashboardCard title="Gestion des disponibilités">
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={3}>

                    <Typography variant="h6">Ajouter une disponibilité</Typography>

                    {/* ENTREPRISE */}
                    <TextField
                        select
                        label="Entreprise"
                        value={selectedCompany}
                        onChange={(e) => handleCompanyChange(e.target.value)}
                        fullWidth
                    >
                        {companies.map(c => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.company}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* SERVICE */}
                    <TextField
                        select
                        label="Service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        disabled={!selectedCompany}
                        fullWidth
                    >
                        {services.map(s => (
                            <MenuItem key={s.id} value={s.id}>
                                {s.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* CALENDAR */}
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridDay"
                        selectable
                        allDaySlot={false}
                        slotMinTime="06:00:00"
                        slotMaxTime="24:00:00"
                        slotDuration="00:30:00"
                        height={450}
                        select={handleSelect}
                        validRange={{
                            start: dayjs().startOf('day').toDate()
                        }}
                    />

                    {startDateTime && endDateTime && (
                        <Alert severity="info">
                            Date : <b>{selectedDate}</b><br />
                            Heure : {startDateTime.format('HH:mm')} → {endDateTime.format('HH:mm')}
                        </Alert>
                    )}

                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                        Ajouter
                    </Button>

                    {loading && <CircularProgress />}
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <Divider />

                    <Typography variant="h6">Disponibilités existantes</Typography>

                    {availabilities.map(a => (
                        <Paper key={a.id} sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack>
                                    <Typography fontWeight="bold">
                                        {a.company} – {a.service}
                                    </Typography>
                                    <Typography variant="body2">
                                        {a.date} | {a.start_time.slice(0, 5)} → {a.end_time.slice(0, 5)}
                                    </Typography>
                                </Stack>
                                <IconButton
                                    color="error"
                                    onClick={() => openDeleteDialog(a)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}

                </Stack>
            </Paper>

            {/* DELETE MODAL */}
            <Dialog open={openDeleteModal} onClose={closeDeleteDialog}>
                <DialogTitle>Supprimer la disponibilité</DialogTitle>
                <DialogContent>
                    <Typography>
                        Voulez-vous vraiment supprimer cette disponibilité ?
                    </Typography>
                    {selectedSchedule && (
                        <Typography mt={1} fontWeight="bold">
                            {selectedSchedule.date} —{' '}
                            {selectedSchedule.start_time.slice(0, 5)} →{' '}
                            {selectedSchedule.end_time.slice(0, 5)}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>
                        Annuler
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmDelete}
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

        </DashboardCard>
    );
};

export default EmployeeAvailabilityManager;
