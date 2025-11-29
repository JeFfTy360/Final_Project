import React from "react";
import { Avatar as MuiAvatar, Menu, MenuItem, IconButton } from "@mui/material";

function AvatarMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MuiAvatar
                    // alt="User Avatar"
                    src="/avatar.png"
                    sx={{ width: 40, height: 40, cursor: "pointer", bgcolor: "#00777D" }}

                />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleClose}>Voir profil</MenuItem>
                <MenuItem onClick={handleClose}>Paramètres</MenuItem>
                <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
            </Menu>
        </>
    );
}

export default AvatarMenu;
