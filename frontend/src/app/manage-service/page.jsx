'use client'
import { Grid, Box } from '@mui/material';


import PageContainer from '../dash/components/pageContainer';
import ServiceManager from './components/ServiceManager';
// import EmployeeInvitations from './components/EmployeeInvitations';










export default function DashboardPage() {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <ServiceManager />
                {/* <EmployeeInvitations /> */}
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
