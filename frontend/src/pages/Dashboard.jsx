import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // In a real app, you would get the user role from an auth context
    const userRole = 'employee'; 

    const commonItems = [
        { text: 'Inbox', icon: <InboxIcon />, action: () => {} },
        { text: 'Starred', icon: <MailIcon />, action: () => {} },
        { text: 'Send email', icon: <MailIcon />, action: () => {} },
        { text: 'Drafts', icon: <InboxIcon />, action: () => {} },
    ];

    const companyItems = [
        { text: 'Create Service', icon: <AddCircleOutlineIcon />, action: () => navigate('/company/service/create') },
        { text: 'Manage Employees', icon: <GroupIcon />, action: () => navigate('/company/employees') },
    ];

    const employeeItems = [
        { text: 'Manage Schedule', icon: <CalendarTodayIcon />, action: () => navigate('/employee/schedule') },
        { text: 'Create Portfolio', icon: <AccountBoxIcon />, action: () => navigate('/employee/portfolio') },
    ];

    let drawerItems;
    if (userRole === 'company') {
        drawerItems = [...commonItems, ...companyItems];
    } else if (userRole === 'employee') {
        drawerItems = [...commonItems, ...employeeItems];
    } else {
        drawerItems = commonItems;
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {t('Dashboard')}
                    </Typography>
                </Toolbar>
                <List>
                    {drawerItems.map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={item.action}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={t(item.text)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Typography paragraph>
                    {t('Welcome to your dashboard!')}
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
