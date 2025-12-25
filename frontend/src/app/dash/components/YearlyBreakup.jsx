'use client'
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, CircularProgress } from '@mui/material';
import DashboardCard from "./DashboardCard";
import { PieChart } from '@mui/x-charts/PieChart';
import api from "@/utils/api";

const YearlyBreakup = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const settings = {
        width: 260,
        height: 210,
        hideLegend: false,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/companies/statistics-by-employees");

                // Convertir ton format → PieChart format
                const formatted = response.data.map(emp => ({
                    label: emp.employee_name,
                    value: emp.count
                }));

                setData(formatted);

            } catch (error) {
                console.error("Erreur lors du fetch:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calcul du total
    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <DashboardCard title="Performances des employés">
            <Grid container justifyContent="center" alignItems="center">

                <Typography fontWeight="700" textAlign="center">
                    Total Appointments: {total}
                </Typography>

                <Grid item>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <PieChart
                            series={[
                                {
                                    innerRadius: 50,
                                    outerRadius: 100,
                                    data,
                                    arcLabel: 'value'
                                }
                            ]}
                            {...settings}
                        />
                    )}
                </Grid>

            </Grid>
        </DashboardCard>
    );
};

export default YearlyBreakup;
