'use client';

import React, { useEffect, useState } from 'react';
import {
    Stack,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
    Chip,
    Divider
} from '@mui/material';

import DashboardCard from '@/app/dash/components/DashboardCard';
import api from '@/utils/api';

const JoinCompanyByCode = () => {

    /* ===================== STATE ===================== */
    const [companyCode, setCompanyCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [invitations, setInvitations] = useState([]);
    const [loadingInvitations, setLoadingInvitations] = useState(true);

    /* ===================== LOAD INVITATIONS ===================== */
    const loadInvitations = async () => {
        try {
            setLoadingInvitations(true);
            const res = await api.get('/employee/invitations');
            setInvitations(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingInvitations(false);
        }
    };

    useEffect(() => {
        loadInvitations();
    }, []);

    /* ===================== SUBMIT ===================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!companyCode.trim()) {
            setError("Veuillez entrer le code de l'entreprise");
            return;
        }

        setLoading(true);

        try {
            await api.post('/employee/join', {
                code_invitation: companyCode.trim()
            });

            setSuccess("Demande envoyée avec succès");
            setCompanyCode('');
            loadInvitations(); // 🔄 refresh liste
        } catch (err) {
            console.error(err);
            setError(
                err?.response?.data?.message ||
                "Code invalide ou erreur lors de l'envoi"
            );
        } finally {
            setLoading(false);
        }
    };

    /* ===================== STATUS COLOR ===================== */
    const statusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'success';
            case 'denied':
                return 'error';
            default:
                return 'warning';
        }
    };

    /* ===================== UI ===================== */
    return (
        <DashboardCard title="Rejoindre une entreprise">
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={4}>

                    {/* ===== FORM ===== */}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Entrer le code de l’entreprise
                            </Typography>

                            <TextField
                                label="Code de l’entreprise"
                                placeholder="Ex: ABC123"
                                value={companyCode}
                                onChange={(e) => setCompanyCode(e.target.value)}
                                fullWidth
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                Envoyer la demande
                            </Button>

                            {loading && <CircularProgress size={24} />}
                            {success && <Alert severity="success">{success}</Alert>}
                            {error && <Alert severity="error">{error}</Alert>}
                        </Stack>
                    </form>

                    <Divider />

                    {/* ===== INVITATIONS LIST ===== */}
                    <Typography variant="h6">
                        Invitations envoyées
                    </Typography>

                    {loadingInvitations && <CircularProgress />}

                    {!loadingInvitations && invitations.length === 0 && (
                        <Typography color="text.secondary">
                            Aucune invitation envoyée
                        </Typography>
                    )}

                    <Stack spacing={2}>
                        {invitations.map((inv) => (
                            <Paper key={inv.id} sx={{ p: 2 }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography>
                                        {inv.company}
                                    </Typography>

                                    <Chip
                                        label={inv.status}
                                        color={statusColor(inv.status)}
                                    />
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>

                </Stack>
            </Paper>
        </DashboardCard>
    );
};

export default JoinCompanyByCode;
