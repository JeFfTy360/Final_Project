import React, { useState, useRef } from "react";
import { Box, Paper } from "@mui/material";

export default function HoverMenu({ anchor, children }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                display: "inline-block",
                height: "100%",             // crucial
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Bouton */}
            <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
                {anchor}
            </Box>

            {/* Mega Menu */}
            {open && (
                <Paper
                    elevation={4}
                    sx={{
                        position: "absolute",
                        top: "100%",               // Collé EXACTEMENT sous le bouton
                        left: 0,

                        p: 2,
                        zIndex: 3000,
                        borderTopLeftRadius: 0,    // optionnel
                        borderTopRightRadius: 0,   // optionnel
                    }}
                >
                    {children}
                </Paper>
            )}
        </Box>
    );
}
