'use client';

import React, { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Typography,
    CircularProgress,
    Paper,
    Alert,
} from "@mui/material";
import DashboardCard from "@/app/dash/components/DashboardCard";
import api from "@/utils/api";


const AddServiceForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        media_url: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const res = await api.post("/companies/services", {
                ...formData,
                price: parseFloat(formData.price),
            });

            setSuccess("Service ajouté avec succès !");
            setFormData({
                name: "",
                description: "",
                price: "",
                media_url: "",
            });

        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'ajout du service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardCard title="Ajouter un service">
            <Paper
                elevation={1}
                sx={{ p: 3, borderRadius: 3 }}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>

                        <TextField
                            label="Nom du service"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            required
                        />

                        <TextField
                            label="Prix"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="URL du média"
                            name="media_url"
                            value={formData.media_url}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {loading ? (
                            <CircularProgress sx={{ mx: "auto", mt: 2 }} />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Ajouter le service
                            </Button>
                        )}

                        {success && (
                            <Alert severity="success">{success}</Alert>
                        )}

                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}
                    </Stack>
                </form>
            </Paper>
        </DashboardCard>
    );
};

export default AddServiceForm;
