// src/components/HaitiMap.jsx
import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Box, Typography, Button, List, ListItem, TextField, IconButton } from "@mui/material"; // Added Typography, Button, List, ListItem, TextField, IconButton
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, UploadFile as UploadFileIcon } from "@mui/icons-material"; // Added icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix icons for Leaflet + bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});


function ClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
}

export default function HaitiMap({ storageKey = "haiti-map-points", initialPoints = [], height = 500 }) {
    const [points, setPoints] = useState(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : initialPoints;
        } catch {
            return initialPoints;
        }
    });

    const [editingId, setEditingId] = useState(null);
    const [editingLabel, setEditingLabel] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(points));
        } catch (error) {
            console.error("Storage error:", error); // Log the error
        }
    }, [points, storageKey]);

    const addPoint = useCallback((latlng) => {
        const id = Date.now().toString();
        const newPoint = {
            id,
            label: `Point ${points.length + 1}`,
            lat: latlng.lat,
            lng: latlng.lng,
            createdAt: new Date().toISOString(),
        };
        setPoints((p) => [...p, newPoint]);
    }, [points.length]);

    const updatePoint = useCallback((id, patch) => {
        setPoints((p) => p.map(pt => pt.id === id ? { ...pt, ...patch } : pt));
    }, []);

    const removePoint = useCallback((id) => {
        setPoints((p) => p.filter(pt => pt.id !== id));
    }, []);

    const onMarkerDragEnd = (id, e) => {
        const { lat, lng } = e.target.getLatLng();
        updatePoint(id, { lat, lng });
    };

    const startEdit = (pt) => {
        setEditingId(pt.id);
        setEditingLabel(pt.label || "");
    };

    const saveEdit = () => {
        if (!editingId) return;
        updatePoint(editingId, { label: editingLabel });
        setEditingId(null);
        setEditingLabel("");
    };

    const exportJSON = () => {
        const dataStr = JSON.stringify(points, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "haiti-points.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const importJSON = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (Array.isArray(parsed)) {
                    // You can add validation here
                    setPoints(parsed);
                } else {
                    alert("Fichier JSON invalide (doit être un tableau de points).");
                }
            } catch (error) {
                console.error("JSON parsing error:", error); // Log the error
                alert("Erreur de parsing JSON.");
            }
        };
        reader.readAsText(file);
    };

    // Center on Port-au-Prince (~18.5944, -72.3074)
    const center = [18.5944, -72.3074];
    const zoom = 8;

    return (
        <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
            <Box flex={1}>
                <MapContainer center={center} zoom={zoom} style={{ height: `${height}px`, width: "100%" }}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ClickHandler onMapClick={addPoint} />

                    {points.map(pt => (
                        <Marker
                            key={pt.id}
                            position={[pt.lat, pt.lng]}
                            draggable={true}
                            eventHandlers={{
                                dragend: (e) => onMarkerDragEnd(pt.id, e),
                            }}
                        >
                            <Popup>
                                <Typography fontWeight={600}>{pt.label}</Typography>
                                <Typography variant="caption">Lat: {pt.lat.toFixed(5)} / Lng: {pt.lng.toFixed(5)}</Typography>
                                <Box mt={1}>
                                    <Button size="small" variant="outlined" onClick={() => startEdit(pt)} startIcon={<EditIcon />}>Edit</Button>
                                    <Button size="small" variant="outlined" color="error" onClick={() => removePoint(pt.id)} startIcon={<DeleteIcon />} sx={{ ml: 1 }}>Delete</Button>
                                </Box>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>

            {/* Right panel: list / controls */}
            <Box minWidth={{ md: 320 }} maxWidth={400} p={1}>
                <Typography variant="h6" gutterBottom>Points ({points.length})</Typography>

                <List dense>
                    {points.map(pt => (
                        <ListItem key={pt.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box flex={1}>
                                <Typography variant="body2" fontWeight={600}>{pt.label}</Typography>
                                <Typography variant="caption"> {pt.lat.toFixed(5)}, {pt.lng.toFixed(5)}</Typography>
                            </Box>

                            <IconButton size="small" onClick={() => startEdit(pt)}><EditIcon fontSize="small" /></IconButton>
                            <IconButton size="small" onClick={() => removePoint(pt.id)}><DeleteIcon fontSize="small" /></IconButton>
                        </ListItem>
                    ))}
                </List>

                {/* Edit area */}
                {editingId && (
                    <Box mt={2} display="flex" gap={1} alignItems="center">
                        <TextField size="small" fullWidth value={editingLabel} onChange={(e) => setEditingLabel(e.target.value)} />
                        <IconButton color="primary" onClick={saveEdit}><SaveIcon /></IconButton>
                    </Box>
                )}

                <Box mt={2} display="flex" gap={1} flexDirection="column">
                    <Button variant="contained" onClick={exportJSON} startIcon={<UploadFileIcon />}>Exporter JSON</Button>

                    <label htmlFor="import-json">
                        <input
                            id="import-json"
                            accept="application/json"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => importJSON(e.target.files?.[0])}
                        />
                        <Button variant="outlined" component="span">Importer JSON</Button>
                    </label>

                    <Button variant="outlined" onClick={() => { if (confirm("Supprimer tous les points ?")) setPoints([]); }}>Supprimer tous</Button>
                </Box>
            </Box>
        </Box>
    );
}
