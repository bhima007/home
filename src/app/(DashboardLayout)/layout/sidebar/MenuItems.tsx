import {
  IconAperture,
  IconBuilding,
  IconCategory,
  IconCopy,
  IconFriends,
  IconHome,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconStar,
  IconTypography,
  IconUserCheck,
  IconUserPlus,
  IconUsers,
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
    subheader: "Master Data",
  },
  {
    id: uniqueId(),
    title: "Data Bangunan",
    icon: IconBuilding,
    href: "/master/bangunan",
  },
  {
    id: uniqueId(),
    title: "Data Kamar",
    icon: IconHome,
    href: "/master/kamar",
  },
  // {
  //   id: uniqueId(),
  //   title: "Data Role",
  //   icon: IconUserCheck,
  //   href: "/master/role",
  // },
  {
    id: uniqueId(),
    title: "Data Users",
    icon: IconUsers,
    href: "/master/users",
  },
  {
    id: uniqueId(),
    title: "Data Penyewa",
    icon: IconFriends,
    href: "/master/penyewa",
  },
  // {
  //   id: uniqueId(),
  //   title: "Data Layanan",
  //   icon: IconStar,
  //   href: "/master/layanan",
  // },
  {
    navlabel: true,
    subheader: "Pelayanan",
  },
  {
    id: uniqueId(),
    title: "Data Pengaduan",
    icon: IconCategory,
    href: "/pelayanan/pengaduan",
  },
  {
    id: uniqueId(),
    title: "Data Peraturan Kos",
    icon: IconCategory,
    href: "/pelayanan/peraturan",
  },
  {
    id: uniqueId(),
    title: "Data Pengumuman",
    icon: IconCategory,
    href: "/pelayanan/pengumuman",
  },
];

export default Menuitems;
