
import { Grid, Box, CircularProgress } from '@mui/material';
import PageContainer from './components/pageContainer';

import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import ProductPerformance from './components/ProductPerformance';

import GeneralStats from './components/GeneralStats';

export default function DashboardPage() {



    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>

                    {/* 🔵 Total Employees */}
                    <GeneralStats />

                    <Grid size={{ xs: 12, lg: 4 }}>

                        <Grid size={12}>
                            <YearlyBreakup />
                        </Grid>

                    </Grid>

                    <Grid size={{ xs: 12, lg: 8 }}>
                        <SalesOverview />
                    </Grid>

                    <Grid size={{ xs: 12, lg: 12 }}>
                        <ProductPerformance />
                    </Grid>

                </Grid>
            </Box>
        </PageContainer>
    );
}
