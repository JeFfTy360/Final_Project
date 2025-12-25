"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState, Activity } from "react";
import HeaderEmployee from "./dash/components/HeaderEmployee";
import Sidebar from "./dash/components/SidebarEmployee";
import SidebarEmployee from "./dash/components/SidebarEmployee";
// SidebarEmployee







const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
}));


export default function RootLayout({
    children,
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    return (
        <MainWrapper className="mainwrapper">
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}
            <SidebarEmployee
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
            />

            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper className="page-wrapper">
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}
                <HeaderEmployee toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
                {/* ------------------------------------------- */}
                {/* PageContent */}
                {/* ------------------------------------------- */}
                <Container
                    sx={{
                        paddingTop: "20px",
                        maxWidth: "1200px",
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Page Route */}
                    {/* ------------------------------------------- */}
                    <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                    {/* ------------------------------------------- */}
                    {/* End Page */}
                    {/* ------------------------------------------- */}
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
}
