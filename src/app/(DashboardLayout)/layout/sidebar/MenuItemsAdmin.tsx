import { ReceiptLongOutlined } from "@mui/icons-material";
import {
  IconBuilding,
  IconCategory,
  IconFriends,
  IconHome,
  IconLayoutDashboard,
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
  {
    navlabel: true,
    subheader: "Transaksi",
  },
  {
    id: uniqueId(),
    title: "Data Transaksi",
    icon: ReceiptLongOutlined,
    href: "/transaksi",
  },
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
