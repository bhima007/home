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
