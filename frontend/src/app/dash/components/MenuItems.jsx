import {
    IconLayoutDashboard,
} from "@tabler/icons-react";

import MarkEmailUnread from '@mui/icons-material/MarkEmailUnread';
import Add from '@mui/icons-material/Add';
import Reorder from '@mui/icons-material/Reorder';
import Group from '@mui/icons-material/Group';
import PersonAdd from '@mui/icons-material/PersonAdd';

import { uniqueId } from "lodash";

const Menuitems = [
    {
        navlabel: true,
        subheader: "HOME",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dash",
    },

    {
        id: uniqueId(),
        title: "Invitations",
        icon: PersonAdd,
        href: "/invitations",
    },
    {
        navlabel: true,
        subheader: "Service",
    },
    {
        id: uniqueId(),
        title: "Add Service",
        icon: Add,
        href: "/services",
    },
    {
        id: uniqueId(),
        title: "Gerer ses Services",
        icon: Reorder,
        href: "/manage-service",
    },
    {
        navlabel: true,
        subheader: " Employee",
    },
    {
        id: uniqueId(),
        title: "Manage Employees",
        icon: Group,
        href: "/manage-employee",
    },

];

export default Menuitems;


