import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, styled, Link, Button, IconButton, Drawer, List, ListItem, Dialog, DialogTitle, DialogContent, Slider, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import LoginRegister from './LoginRegister';
import BtnAuth from './BtnAuth';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from '@mui/icons-material/Menu';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HoverMenu from './HoverMenu';
import { usePrice } from '../../context/usePrice';
import HaitiMap from '../HaitiMap';
import ReactCountryFlag from "react-country-flag";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const getFlagByLanguage = (lang) => {
    switch (lang) {
        case "en":
            return <ReactCountryFlag countryCode="GB" svg />;
        case "fr":
            return <ReactCountryFlag countryCode="FR" svg />;
        case "ht":
            return <ReactCountryFlag countryCode="HT" svg />; // Assuming "ht" for Haitian Creole
        default:
            return null;
    }
};

const ToolBarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
        justifyContent: "space-between",
    },
}));

const GroupOptionsText = styled(Box)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.up('md')]: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "0.2rem"
    },
}));

const TitleTypography = styled(Typography)(() => ({
    fontFamily: "'Archivo Black', sans-serif",
    fontWeight: 800,
    fontSize: "30px",
    lineHeight: "22px",
    color: "#000000",
    height: "40px",
    display: 'flex',
    alignItems: 'center',
}));

const OptionNav = styled(Button)(() => ({
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    fontWeight: 200,
    fontSize: "15px",
    lineHeight: "18px",
    textTransform: "none",
    color: "#000000",
}));

function Header() {
    const { price, setPrice } = usePrice();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [accessibilityOpen, setAccessibilityOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false); // Add mapOpen state
    const { t, i18n } = useTranslation();

    // Paramètres d'accessibilité
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [lineSpacing, setLineSpacing] = useState(1.5);
    const [colorBlindMode, setColorBlindMode] = useState('none');
    const [hideImages, setHideImages] = useState(false);
    const [grayscaleImages, setGrayscaleImages] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAccessibilityToggle = () => {
        setAccessibilityOpen(!accessibilityOpen);
    };

    const handleMapToggle = () => { // Add handleMapToggle function
        setMapOpen(!mapOpen);
    };

    // Appliquer les paramètres d'accessibilité
    React.useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        document.documentElement.style.lineHeight = lineSpacing;

        if (highContrast) {
            document.body.style.filter = 'contrast(1.5)';
        } else {
            document.body.style.filter = 'none';
        }

        // Gestion des images
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (hideImages) {
                img.style.display = 'none';
            } else {
                img.style.display = '';
                if (grayscaleImages) {
                    img.style.filter = 'grayscale(100%)';
                } else {
                    img.style.filter = '';
                }
            }
        });

        // Filtres pour daltonisme
        const filters = {
            none: 'none',
            protanopia: 'url(#protanopia)', // Rouge-vert (absence de rouge)
            deuteranopia: 'url(#deuteranopia)', // Rouge-vert (absence de vert)
            tritanopia: 'url(#tritanopia)', // Bleu-jaune
            monochrome: 'grayscale(100%)' // Vision en noir et blanc
        };

        // Appliquer le filtre SVG ou CSS
        if (colorBlindMode === 'monochrome') {
            document.body.style.filter = highContrast
                ? 'contrast(1.5) grayscale(100%)'
                : 'grayscale(100%)';
        } else if (colorBlindMode !== 'none') {
            // Pour les autres modes, on utilise des filtres SVG
            const svgFilters = `
                <svg style="position: absolute; width: 0; height: 0;">
                    <defs>
                        <!-- Filtre Protanopia (déficience rouge) -->
                        <filter id="protanopia">
                            <feColorMatrix type="matrix" values="
                                0.567, 0.433, 0,     0, 0
                                0.558, 0.442, 0,     0, 0
                                0,     0.242, 0.758, 0, 0
                                0,     0,     0,     1, 0"/>
                        </filter>
                        
                        <!-- Filtre Deuteranopia (déficience vert) -->
                        <filter id="deuteranopia">
                            <feColorMatrix type="matrix" values="
                                0.625, 0.375, 0,   0, 0
                                0.7,   0.3,   0,   0, 0
                                0,     0.3,   0.7, 0, 0
                                0,     0,     0,   1, 0"/>
                        </filter>
                        
                        <!-- Filtre Tritanopia (déficience bleu) -->
                        <filter id="tritanopia">
                            <feColorMatrix type="matrix" values="
                                0.95, 0.05,  0,     0, 0
                                0,    0.433, 0.567, 0, 0
                                0,    0.475, 0.525, 0, 0
                                0,    0,     0,     1, 0"/>
                        </filter>
                    </defs>
                </svg>
            `;

            // Injecter ou mettre à jour les filtres SVG
            let svgElement = document.getElementById('color-blind-filters');
            if (!svgElement) {
                const div = document.createElement('div');
                div.innerHTML = svgFilters;
                div.firstElementChild.id = 'color-blind-filters';
                document.body.insertBefore(div.firstElementChild, document.body.firstChild);
            }

            document.body.style.filter = highContrast
                ? `contrast(1.5) ${filters[colorBlindMode]}`
                : filters[colorBlindMode];
        } else {
            document.body.style.filter = highContrast ? 'contrast(1.5)' : 'none';
        }
    }, [fontSize, highContrast, lineSpacing, colorBlindMode, hideImages, grayscaleImages]);

    const drawer = (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                TCHEKEM
            </Typography>

            {/* ACCESSIBILITÉ */}
            <Button
                fullWidth
                startIcon={<AccessibilityNewIcon />}
                onClick={handleAccessibilityToggle}
                sx={{ mb: 2 }}
            >
                {t('Accessibilité')}
            </Button>

            {/* BUSINESS */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t('For business')}
                </AccordionSummary>
                <AccordionDetails>
                    <Button fullWidth>{t('Créer un compte Pro')}</Button>
                    <Button fullWidth>{t('Gérer votre entreprise')}</Button>
                </AccordionDetails>
            </Accordion>
            {/* MAPS */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t('Maps')}
                </AccordionSummary>
                <AccordionDetails>
                    <Button fullWidth onClick={handleMapToggle}>{t('Map')}</Button>
                </AccordionDetails>
            </Accordion>

            {/* MONNAIES */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t('Monnaie')} : {price}
                </AccordionSummary>
                <AccordionDetails>
                    <Button fullWidth onClick={() => setPrice("USD")}>
                        $ USD
                    </Button>
                    <Button fullWidth onClick={() => setPrice("EUR")}>
                        € EUR
                    </Button>
                    <Button fullWidth onClick={() => setPrice("RUB")}>
                        ₽ RUB
                    </Button>
                </AccordionDetails>
            </Accordion>

            {/* AUTRES */}
            <Button fullWidth sx={{ mt: 2 }}>{t('Catalogues')}</Button>
            <Button fullWidth>{t('Customer service')}</Button>

            <Box sx={{ mt: 2 }}>
                <BtnAuth />
            </Box>
        </Box>
    );

    return (
        <>
            <ToolBarStyled>
                <TitleTypography variant="h6">
                    {t('TCHEKEM')}
                </TitleTypography>
                <GroupOptionsText>
                    {/* Bouton Accessibilité */}
                    <IconButton
                        onClick={handleAccessibilityToggle}
                        aria-label={t("Paramètres d'accessibilité")}
                        color="primary"
                    >
                        <AccessibilityNewIcon />
                    </IconButton>

                    <HoverMenu
                        anchor={
                            <Button href="#" color="text.secondary">
                                {t('For business')}
                            </Button>
                        }
                    >
                        <Typography variant="subtitle1" fontWeight={600}>
                            {t('Solutions professionnelles')}
                        </Typography>
                        <Button fullWidth>{t('Créer un compte Pro')}</Button>
                        <Button fullWidth>{t('Gérer votre entreprise')}</Button>
                    </HoverMenu>
                    <HoverMenu
                        anchor={
                            <Button color="text.secondary">
                                {getFlagByLanguage(i18n.language)}
                            </Button>
                        }
                    >
                        <Button onClick={() => i18n.changeLanguage("en")}>
                            <ReactCountryFlag countryCode="GB" svg style={{ marginRight: 8 }} />
                            {t('English')}
                        </Button>
                        <Button onClick={() => i18n.changeLanguage("fr")}>
                            <ReactCountryFlag countryCode="FR" svg style={{ marginRight: 8 }} />
                            {t('Français')}
                        </Button>
                        <Button onClick={() => i18n.changeLanguage("ht")}>
                            <ReactCountryFlag countryCode="HT" svg style={{ marginRight: 8 }} />
                            {t('Kreyòl Ayisyen')}
                        </Button>
                    </HoverMenu>

                    <Button href="#" color="text.secondary" onClick={handleMapToggle}>
                        {t('Maps')}
                    </Button>

                    <HoverMenu anchor={<Button color="text.secondary">{price}</Button>}>
                        <Button onClick={() => setPrice("USD")}>
                            $ USD
                        </Button>
                        <Button onClick={() => setPrice("EUR")}>
                            € EUR
                        </Button>
                        <Button onClick={() => setPrice("RUB")}>
                            ₽ RUB
                        </Button>
                    </HoverMenu>
                    <Button href="#" underline="none" color="text.secondary">
                        {t('Catalogues')}
                    </Button>
                    <Button href="#" underline="none" color="text.secondary">
                        {t('Customer service')}
                    </Button>
                    <BtnAuth />
                </GroupOptionsText>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </ToolBarStyled>

            {/* Dialog Map */}
            <Dialog
                open={mapOpen}
                onClose={handleMapToggle}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>{t('Sélection de zone sur la carte')}</DialogTitle>
                <DialogContent>
                    <HaitiMap height={600} />
                </DialogContent>
            </Dialog>

            {/* Dialog Accessibilité */}
            <Dialog
                open={accessibilityOpen}
                onClose={handleAccessibilityToggle}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessibilityNewIcon />
                        {t('Paramètres d\'accessibilité')}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        {/* Taille de police */}
                        <Typography gutterBottom>
                            {t('Taille de la police')} : {fontSize}%
                        </Typography>
                        <Slider
                            value={fontSize}
                            onChange={(e, newValue) => setFontSize(newValue)}
                            min={80}
                            max={150}
                            step={10}
                            marks
                            valueLabelDisplay="auto"
                            aria-label={t('Taille de la police')}
                        />

                        {/* Espacement des lignes */}
                        <Typography gutterBottom sx={{ mt: 3 }}>
                            {t('Espacement des lignes')} : {lineSpacing}
                        </Typography>
                        <Slider
                            value={lineSpacing}
                            onChange={(e, newValue) => setLineSpacing(newValue)}
                            min={1}
                            max={2.5}
                            step={0.1}
                            marks
                            valueLabelDisplay="auto"
                            aria-label={t('Espacement des lignes')}
                        />

                        {/* Contraste élevé */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={highContrast}
                                    onChange={(e) => setHighContrast(e.target.checked)}
                                />
                            }
                            label={t('Contraste élevé')}
                            sx={{ mt: 2 }}
                        />

                        {/* Mode daltonisme */}
                        <Typography gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
                            {t('Mode daltonisme')}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <IconButton
                                onClick={() => setColorBlindMode('none')}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, #FF0000 0%, #00FF00 50%, #0000FF 100%)',
                                    border: colorBlindMode === 'none' ? '4px solid #000' : '2px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                aria-label={t('Couleurs normales')}
                            />
                            <IconButton
                                onClick={() => setColorBlindMode('protanopia')}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, #8B7355 0%, #FFD700 50%, #4169E1 100%)',
                                    border: colorBlindMode === 'protanopia' ? '4px solid #000' : '2px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                aria-label={t('Protanopie')}
                            />
                            <IconButton
                                onClick={() => setColorBlindMode('deuteranopia')}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, #D4A574 0%, #FFFF00 50%, #1E90FF 100%)',
                                    border: colorBlindMode === 'deuteranopia' ? '4px solid #000' : '2px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                aria-label={t('Deutéranopie')}
                            />
                            <IconButton
                                onClick={() => setColorBlindMode('tritanopia')}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, #FF6B9D 0%, #87CEEB 50%, #20B2AA 100%)',
                                    border: colorBlindMode === 'tritanopia' ? '4px solid #000' : '2px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                aria-label={t('Tritanopie')}
                            />
                            <IconButton
                                onClick={() => setColorBlindMode('monochrome')}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    background: 'linear-gradient(135deg, #000000 0%, #808080 50%, #FFFFFF 100%)',
                                    border: colorBlindMode === 'monochrome' ? '4px solid #000' : '2px solid #ccc',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                                aria-label={t('Monochrome')}
                            />
                        </Box>

                        {/* Options pour les images */}
                        <Typography gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
                            {t('Gestion des images')}
                        </Typography>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hideImages}
                                    onChange={(e) => {
                                        setHideImages(e.target.checked);
                                        if (e.target.checked) {
                                            setGrayscaleImages(false);
                                        }
                                    }}
                                />
                            }
                            label={t('Masquer toutes les images')}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={grayscaleImages}
                                    onChange={(e) => {
                                        setGrayscaleImages(e.target.checked);
                                        if (e.target.checked) {
                                            setHideImages(false);
                                        }
                                    }}
                                    disabled={hideImages}
                                />
                            }
                            label={t('Images en noir et blanc')}
                        />

                        {/* Bouton de réinitialisation */}
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => {
                                setFontSize(100);
                                setLineSpacing(1.5);
                                setHighContrast(false);
                                setColorBlindMode('none');
                                setHideImages(false);
                                setGrayscaleImages(false);
                            }}
                            sx={{ mt: 3 }}
                        >
                            {t('Réinitialiser les paramètres')}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Header;