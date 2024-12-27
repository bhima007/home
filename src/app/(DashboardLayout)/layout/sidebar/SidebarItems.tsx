import React, { useEffect, useState } from "react";
import Menuitems from "./MenuItems";
import MenuitemsAdmin from "./MenuItemsAdmin";
import { usePathname, useRouter } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const router = useRouter();

  const pathname = usePathname();
  const pathDirect = pathname;
  const [auth, setAuth] = React.useState({ role: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setAuth(data);
    } else {
      router.push("/authentication/login");
    }
  }, []);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {auth.role == "ADMIN"
          ? MenuitemsAdmin.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
              } else {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                );
              }
            })
          : Menuitems.map((item) => {
              if (item.subheader) {
                return <NavGroup item={item} key={item.subheader} />;
              } else {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                );
              }
            })}
      </List>
    </Box>
  );
};
export default SidebarItems;
