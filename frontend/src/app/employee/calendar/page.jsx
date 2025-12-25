'use client'
import PageContainer from '@/app/dash/components/pageContainer';
import { Grid, Box } from '@mui/material';
// EmployeeAvailabilityManager

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import EmployeeAvailabilityManager from '../dash/components/EmployeeAvailabilityManager';

EmployeeAvailabilityManager










export default function DashboardPage() {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <EmployeeAvailabilityManager />
                </LocalizationProvider>

                <Grid container spacing={3}>
                    <Grid
                        size={{
                            xs: 4,
                            lg: 4
                        }}>

                    </Grid>

                    <Grid
                        size={{
                            xs: 4,
                            lg: 4
                        }}>

                    </Grid>
                    <Grid
                        size={{
                            xs: 4,
                            lg: 4
                        }}>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            lg: 4
                        }}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                {/* <YearlyBreakup /> */}
                            </Grid>
                            <Grid size={12}>
                                {/* <MonthlyEarnings /> */}


                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 8
                        }}>
                        {/* <SalesOverview /> */}
                    </Grid>
                    {/* <Grid
                        size={{
                            xs: 12,
                            lg: 4
                        }}>
                        <RecentTransactions />
                    </Grid> */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 12
                        }}>
                        {/* <ProductPerformance /> */}
                    </Grid>
                    <Grid size={12}>
                        {/* <Blog /> */}
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );

}
