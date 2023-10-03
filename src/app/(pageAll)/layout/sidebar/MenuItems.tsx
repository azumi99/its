import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconPackage,
  IconCircleNumber1,
  IconBuildingStore,
  IconTag,
  IconBuildingSkyscraper,
  IconCheckbox,
  IconApps,
  IconHomeCog,
  IconFilePencil,
  IconNotes,
  IconMessageCircle2
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Master",
  },
  {
    id: uniqueId(),
    title: "Inventory",
    icon: IconPackage,
    href: "/inventory",
  },
  {
    id: uniqueId(),
    title: "Unit",
    icon: IconCircleNumber1,
    href: "/unit",
  },
  {
    id: uniqueId(),
    title: "Vendor",
    icon: IconBuildingStore,
    href: "/vendor",
  },
  {
    id: uniqueId(),
    title: "Category",
    icon: IconTag,
    href: "/category",
  },
  {
    id: uniqueId(),
    title: "Company",
    icon: IconBuildingSkyscraper,
    href: "/company",
  },
  {
    id: uniqueId(),
    title: "Status",
    icon: IconCheckbox,
    href: "/status",
  },
  {
    navlabel: true,
    subheader: "Transactions",
  },
  
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconApps,
    href: "/maintenance",
  },
  {
    id: uniqueId(),
    title: "Maintenace",
    icon: IconHomeCog,
    href: "/maintenance",
  },
  {
    id: uniqueId(),
    title: "Request",
    icon: IconFilePencil,
    href: "/request",
  },
  {
    id: uniqueId(),
    title: "Notes",
    icon: IconNotes,
    href: "/notes",
  },
  {
    id: uniqueId(),
    title: "Chat",
    icon: IconMessageCircle2,
    href: "/chat",
  },
];

export default Menuitems;
