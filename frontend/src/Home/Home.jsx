import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Box,
    Link,
    Divider,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    Share,
    Search,
    Home,
    Business,
    DirectionsCar,
    Laptop,
    FavoriteBorderOutlined,
    LocationOn,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header/Header';
import SearchBar from './Body/SearchBar';
import CategoriesCard from './Body/CategoriesCard';
import LocationCard from './Header/LocationCard';
import AdCard from './Body/AdCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#14b8a6',
        },
    },
});

export default function RealEstateApp() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const categories = [
        { icon: <Home />, label: t('Appartements') },
        { icon: <Business />, label: t('Entreprise') },
        { icon: <DirectionsCar />, label: t('Garage') },
        { icon: <Laptop />, label: t('Bureau local') },
        { icon: <FavoriteBorderOutlined />, label: t('Santé & Beauté') },
        { icon: <DirectionsCar />, label: t('Loisirs') },
    ];

    const locations = ['Port au prince', 'Jacmel', 'Cap', 'Cayes'];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, bgcolor: 'white', minHeight: '100vh' }}>
                {/* Header */}

                <Header />
                <Divider />
                {/* Search Section */}
                {/*  */}
                <SearchBar />

                {/* Categories */}
                <Container maxWidth="lg" sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
                    <Grid container spacing={3}>
                        {categories.map((cat, idx) => (
                            <Grid item xs={6} md={2} key={idx}>
                                <CategoriesCard icon={cat.icon} label={cat.label} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Locations */}
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {locations.map((loc, idx) => (
                            <Grid item key={idx}>
                                <LocationCard location={t(loc)} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* For Business Section */}
                <Box sx={{ bgcolor: '#f5f5f5', py: 6, mt: 4 }}>
                    <Container maxWidth="md">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    {t('Votre entreprise sur Tchekem')}
                                </Typography>
                                <Typography variant="body1">
                                    {t('Rejoignez notre plateforme pour atteindre de nouveaux clients, gérer vos services et développer votre activité. Créez un compte professionnel dès aujourd\'hui.')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                >
                                    {t('Inscrivez votre entreprise')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                {/* Become an Employee Section */}
                <Box sx={{ py: 6 }}>
                    <Container maxWidth="md">
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    {t('Devenez un prestataire de services')}
                                </Typography>
                                <Typography variant="body1">
                                    {t('Rejoignez notre réseau de professionnels et commencez à proposer vos services. Créez votre portfolio, gérez votre emploi du temps et entrez en contact avec des clients.')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                >
                                    {t('Commencez à gagner')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Footer */}
                <Box sx={{ bgcolor: '#f5f5f5', borderTop: 1, borderColor: 'divider', py: 4 }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    {t('Information')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Link href="#" underline="none" color="text.secondary" variant="body2">
                                        {t('Termes et Conditions')}
                                    </Link>
                                    <Link href="#" underline="none" color="text.secondary" variant="body2">
                                        {t('Nous contacter')}
                                    </Link>
                                    <Link href="#" underline="none" color="text.secondary" variant="body2">
                                        {t('Comment ça marche (tutoriel)')}
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    {t('Pour les professionnels')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Link href="#" underline="none" color="text.secondary" variant="body2" onClick={() => navigate('/register')}>
                                        {t('Créer un compte professionnel')}
                                    </Link>
                                    <Link href="#" underline="none" color="text.secondary" variant="body2" onClick={() => navigate('/dashboard')}>
                                        {t('Tableau de bord')}
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    {t('Nos applications')}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', maxWidth: "100%" }}>
                                    <Button
                                        variant="contained"
                                        sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' }, textTransform: 'none' }}
                                        size="small"
                                    >
                                        {t('App Store')}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' }, textTransform: 'none' }}
                                        size="small"
                                    >
                                        {t('Google Play')}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="body2" color="text.secondary" align="center">
                            © 2015 - 2025 Tchiekem
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}