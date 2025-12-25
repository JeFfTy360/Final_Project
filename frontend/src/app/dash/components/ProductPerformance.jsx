'use client';

import {
    Typography, Box,
    Table, TableBody, TableCell,
    TableHead, TableRow, Chip
} from '@mui/material';
import DashboardCard from './DashboardCard';
import { useEffect, useState } from 'react';
import api from '@/utils/api';



const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/companies/rates/employee-by-service');

                if (response.data) {
                    setData(response.data);
                    setError(false);
                }

            } catch (err) {
                console.error("Erreur API :", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des données.</p>;

    return (
        <DashboardCard title="Performance des Employés">
            <Box sx={{ overflow: 'auto', width: { xs: '300px', sm: 'auto' } }}>
                <Table aria-label="employee table" sx={{ whiteSpace: "nowrap", mt: 2 }}>

                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>ID</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Employé</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Service</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Rendez-vous</Typography></TableCell>
                            <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Note</Typography></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((serviceBlock) =>
                            serviceBlock.employees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>
                                        <Typography fontSize="15px" fontWeight="500">
                                            EMP-{emp.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {emp.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2">
                                            {serviceBlock.service}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "primary.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={`${emp.appointment}`}
                                        />
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography variant="h6">
                                            ⭐ {emp.rating ? emp.rating.toFixed(1) : "—"}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </Table>
            </Box>
        </DashboardCard>
    );
};

export default EmployeeTable;
