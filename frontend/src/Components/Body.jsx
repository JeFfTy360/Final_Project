'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaceIcon from '@mui/icons-material/Place';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { useRouter } from 'next/navigation';
import api from '@/utils/api';

/* =========================
   BODY
========================= */

export default function Body() {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [user, setUser] = useState(null);
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    useEffect(() => {
        api.get('/client/services')
            .then(res => setServices(res.data))
            .catch(err => console.error(err));

        api.get('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const cities = [...new Set(
        services.map(s => s.company.address.split(',')[0])
    )];

    const categories = [...new Set(
        services.map(s => s.company.name)
    )];

    const filteredServices = services.filter(s => {
        const searchMatch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase()) ||
            s.company.name.toLowerCase().includes(search.toLowerCase());

        const cityMatch = cityFilter ? s.company.address.includes(cityFilter) : true;
        const categoryMatch = categoryFilter ? s.company.name === categoryFilter : true;

        return searchMatch && cityMatch && categoryMatch;
    });

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                {/* Recherche */}
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        placeholder="Rechercher un service"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" startIcon={<SearchIcon />}>
                        Rechercher
                    </Button>
                </Stack>

                {/* Publier annonce */}
                {/* <Box textAlign="center" mt={5}>
                    <Button
                        variant="contained"
                        color="warning"
                        size="large"
                        startIcon={<AddCircleIcon />}
                        sx={{ color: '#fff', px: 6 }}
                    >
                        Publier une annonce
                    </Button>
                </Box> */}

                {/* Filtres */}
                <Paper sx={{ p: 2, mt: 6 }}>
                    <Typography fontWeight={600} mb={2}>Filtres</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            fullWidth
                            label="Ville"
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                        >
                            <MenuItem value="">Toutes</MenuItem>
                            {cities.map(city => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Catégorie"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <MenuItem value="">Toutes</MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Paper>

                {/* Services */}
                <Stack spacing={3} mt={6}>
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            user={user}
                            onRequireAuth={() => setAuthDialogOpen(true)}
                        />
                    ))}

                    {filteredServices.length === 0 && (
                        <Typography align="center" color="text.secondary">
                            Aucune annonce trouvée
                        </Typography>
                    )}
                </Stack>
            </Container>

            {/* 🔐 MODAL AUTH */}
            <AuthDialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
            />
        </>
    );
}

/* =========================
   AUTH DIALOG
========================= */

function AuthDialog({ open, onClose }) {
    const router = useRouter();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Connexion requise</DialogTitle>

            <DialogContent>
                <Typography>
                    Vous devez vous connecter ou créer un compte pour prendre un rendez-vous.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button
                    variant="outlined"
                    onClick={() => router.push('/login')}
                >
                    Se connecter
                </Button>
                <Button
                    variant="contained"
                    onClick={() => router.push('/login')}
                >
                    Créer un compte
                </Button>
            </DialogActions>
        </Dialog>
    );
}

/* =========================
   SERVICE CARD
========================= */

function ServiceCard({ service, user, onRequireAuth }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        employeeId: '',
        appointment: null,
    });

    const employees = service.employees || [];

    const availabilityOptions = employees.flatMap(emp =>
        emp.availability.map(a => ({
            employeeId: emp.id,
            date: a.date,
            starttime: a.start_time,
            endtime: a.end_time,
        }))
    );

    const handleOpen = () => {
        if (!user) {
            onRequireAuth();
            return;
        }
        setOpen(true);
    };

    const handleConfirm = async () => {
        try {
            setLoading(true);

            await api.post(
                `/client/appointment/${service.id}/${form.employeeId}`,
                {
                    date: form.appointment.date,
                    starttime: form.appointment.starttime,
                    endtime: form.appointment.endtime,
                }
            );

            setOpen(false);
            setForm({
                name: '',
                phone: '',
                employeeId: '',
                appointment: null,
            });

            alert('Rendez-vous confirmé avec succès');
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la prise de rendez-vous");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Paper sx={{ p: 2 }}>
                <Typography fontWeight={600}>{service.name}</Typography>
                <Typography variant="caption">{service.company.name}</Typography>

                <Stack direction="row" spacing={1} mt={1}>
                    <PlaceIcon fontSize="small" />
                    <Typography>{service.company.address}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} mt={1}>
                    <ScheduleIcon fontSize="small" />
                    <Typography>{service.description}</Typography>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                >
                    <Typography fontWeight={600} color="secondary.main">
                        {service.price} HTG
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                    >
                        Prendre rendez-vous
                    </Button>
                </Stack>
            </Paper>

            {/* DIALOG RENDEZ-VOUS */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Prendre rendez-vous</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Nom complet"
                            fullWidth
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <TextField
                            label="Téléphone"
                            fullWidth
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />

                        <TextField
                            select
                            label="Employé"
                            fullWidth
                            value={form.employeeId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    employeeId: e.target.value,
                                    appointment: null,
                                })
                            }
                        >
                            {employees.map(emp => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Disponibilité"
                            fullWidth
                            disabled={!form.employeeId}
                            value={
                                form.appointment
                                    ? `${form.appointment.date}-${form.appointment.starttime}`
                                    : ''
                            }
                            onChange={(e) => {
                                const selected = availabilityOptions.find(
                                    a =>
                                        `${a.date}-${a.starttime}` === e.target.value
                                );
                                setForm({ ...form, appointment: selected });
                            }}
                        >
                            {availabilityOptions
                                .filter(a => a.employeeId === form.employeeId)
                                .map((a, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={`${a.date}-${a.starttime}`}
                                    >
                                        {a.date} {a.starttime.slice(0, 5)} - {a.endtime.slice(0, 5)}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Annuler</Button>
                    <Button
                        variant="contained"
                        disabled={
                            loading ||
                            !form.name ||
                            !form.phone ||
                            !form.employeeId ||
                            !form.appointment
                        }
                        onClick={handleConfirm}
                    >
                        {loading ? 'Confirmation...' : 'Confirmer'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
