import {
    IconLayoutDashboard,
} from "@tabler/icons-react";

import MarkEmailUnread from '@mui/icons-material/MarkEmailUnread';
import Add from '@mui/icons-material/Add';
import Reorder from '@mui/icons-material/Reorder';
import Group from '@mui/icons-material/Group';
import PersonAdd from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { uniqueId } from "lodash";

const MenuItemsEmployee = [
    {
        navlabel: true,
        subheader: "HOME",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/employee/dash",
    },

    {
        id: uniqueId(),
        title: "Join Enterprise",
        icon: PersonAdd,
        href: "/employee/invitations",
    },
    {
        navlabel: true,
        subheader: "Service",
    },
    {
        id: uniqueId(),
        title: "Add Calendar",
        icon: Add,
        href: "/employee/calendar",
    },
    {
        id: uniqueId(),
        title: "Gerer son portfolio",
        icon: Reorder,
        href: "/employee/portfolio",
    },


];

export default MenuItemsEmployee;


