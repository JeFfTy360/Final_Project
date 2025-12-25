"use client";

import React, { useEffect, useState } from "react";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import DashboardCard from "./DashboardCard";
import api from "@/utils/api";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatisticsAppointments = () => {
    const theme = useTheme();

    const [month, setMonth] = useState(new Date().getMonth() + 1); // mois actuel
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const handleChange = (event) => {
        setMonth(event.target.value);
        setLoading(true);
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get(`/companies/days/statistics-appointments?month=${month}`);
                setCategories(response.data.categories);
                setSeries(response.data.series);
            } catch (error) {
                console.error("Erreur lors du chargement:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [month]);

    const options = {
        chart: {
            type: "bar",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: "#adb0bb",
            toolbar: { show: true },
            height: 210,
        },
        colors: [primary, secondary, "#FFA726"],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "42%",
                borderRadius: 6,
            },
        },
        stroke: {
            show: true,
            width: 5,
            colors: ["transparent"],
        },
        legend: { show: true },
        grid: {
            borderColor: "rgba(0,0,0,0.1)",
            strokeDashArray: 3,
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories,
            axisBorder: { show: false },
        },
        tooltip: { theme: "dark" },
    };

    return (
        <DashboardCard
            title="Statistiques des Rendez-vous par mois"
            action={
                <Select value={month} size="small" onChange={handleChange}>
                    <MenuItem value={1}>Janvier</MenuItem>
                    <MenuItem value={2}>Février</MenuItem>
                    <MenuItem value={3}>Mars</MenuItem>
                    <MenuItem value={4}>Avril</MenuItem>
                    <MenuItem value={5}>Mai</MenuItem>
                    <MenuItem value={6}>Juin</MenuItem>
                    <MenuItem value={7}>Juillet</MenuItem>
                    <MenuItem value={8}>Août</MenuItem>
                    <MenuItem value={9}>Septembre</MenuItem>
                    <MenuItem value={10}>Octobre</MenuItem>
                    <MenuItem value={11}>Novembre</MenuItem>
                    <MenuItem value={12}>Décembre</MenuItem>
                </Select>
            }
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <Chart options={options} series={series} type="bar" height={215} width="100%" />
            )}
        </DashboardCard>
    );
};

export default StatisticsAppointments;
