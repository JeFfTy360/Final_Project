import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Stack,
    Typography,
    Box,
    Divider,
    IconButton,
    Paper,
    CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import RefreshIcon from "@mui/icons-material/Refresh";
import DashboardCard from "@/app/dash/components/DashboardCard";
import api from "@/utils/api";

const EmployeeInvitations = () => {

    const [inviteCode, setInviteCode] = useState("");
    const [loadingCode, setLoadingCode] = useState(true);

    const [invitations, setInvitations] = useState([]);
    const [loadingInvites, setLoadingInvites] = useState(true);

    // --- Récupération du code depuis l’API ---
    const fetchInviteCode = async () => {
        try {
            const res = await api.get("/companies/code");
            setInviteCode(res.data.code);
        } catch (err) {
            console.error("Erreur code invitation:", err);
        } finally {
            setLoadingCode(false);
        }
    };

    // --- Récupération des invitations ---
    const fetchInvitations = async () => {
        try {
            const response = await api.get("/companies/invitations");
            setInvitations(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des invitations:", error);
        } finally {
            setLoadingInvites(false);
        }
    };

    // Chargement initial
    useEffect(() => {
        fetchInviteCode();
        fetchInvitations();
    }, []);

    // --- Acceptation ---
    const handleAccept = async (invitationId) => {
        try {
            await api.post(`/companies/accept/${invitationId}`);
            fetchInvitations();
        } catch (err) {
            console.error("Erreur acceptation:", err);
        }
    };

    // --- Refus ---
    const handleReject = async (invitationId) => {
        try {
            await api.post(`/companies/denied/${invitationId}`);
            fetchInvitations();
        } catch (err) {
            console.error("Erreur refus:", err);
        }
    };

    // --- Copie ---
    const handleCopy = () => navigator.clipboard.writeText(inviteCode);

    // --- Partage ---
    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: "Code d'invitation",
                text: `Voici mon code d'invitation : ${inviteCode}`,
            });
        } else {
            alert("Le partage n'est pas supporté sur cet appareil.");
        }
    };

    // --- Regénération via API ---
    const handleRegenerate = async () => {
        try {
            const res = await api.post("/companies/genrate-code");
            setInviteCode(res.data.code);
        } catch (err) {
            console.error("Erreur génération code:", err);
        }
    };

    return (
        <DashboardCard title="Invitations des employés">
            <Stack spacing={3}>

                {/* --- CODE D’INVITATION --- */}
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography fontWeight="600">Code d’invitation</Typography>

                        {loadingCode ? (
                            <CircularProgress size={22} sx={{ mt: 1 }} />
                        ) : (
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: "bold",
                                    letterSpacing: 2,
                                    fontFamily: "monospace",
                                }}
                            >
                                {inviteCode}
                            </Typography>
                        )}
                    </Box>

                    {/* === Actions code === */}
                    <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={handleCopy}>
                            <ContentCopyIcon />
                        </IconButton>

                        <IconButton color="info" onClick={handleShare}>
                            <ShareIcon />
                        </IconButton>

                        <IconButton color="warning" onClick={handleRegenerate}>
                            <RefreshIcon />
                        </IconButton>
                    </Stack>
                </Paper>

                {/* --- LISTE DES INVITATIONS --- */}
                {loadingInvites ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : invitations.length === 0 ? (
                    <Typography color="textSecondary" textAlign="center">
                        Aucune invitation pour le moment.
                    </Typography>
                ) : (
                    invitations.map((emp, index) => (
                        <Box key={emp.id}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                {/* Info employé */}
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar>{emp.name[0]}</Avatar>

                                    <Box>
                                        <Typography fontWeight="600">{emp.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {emp.email}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            {emp.title}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color:
                                                    emp.status === "pending"
                                                        ? "warning.main"
                                                        : emp.status === "accepted"
                                                            ? "success.main"
                                                            : "error.main",
                                            }}
                                        >
                                            {emp.status}
                                        </Typography>
                                    </Box>
                                </Stack>

                                {/* Boutons si status = pending */}
                                {emp.status === "pending" && (
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleAccept(emp.id)}
                                        >
                                            Accepter
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleReject(emp.id)}
                                        >
                                            Refuser
                                        </Button>
                                    </Stack>
                                )}
                            </Stack>

                            {index < invitations.length - 1 && (
                                <Divider sx={{ my: 1 }} />
                            )}
                        </Box>
                    ))
                )}
            </Stack>
        </DashboardCard>
    );
};

export default EmployeeInvitations;
