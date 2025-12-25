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

const MenuItemsClient = [
    {
        navlabel: true,
        subheader: "HOME",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/client/dash",
    },


    {
        navlabel: true,
        subheader: "Pro",
    },
    {
        id: uniqueId(),
        title: "Enterprise profile",
        icon: Add,
        href: "/dash",
    },
    {
        id: uniqueId(),
        title: "Employee profile",
        icon: Reorder,
        href: "/employee/dash",
    },


];

export default MenuItemsClient;


