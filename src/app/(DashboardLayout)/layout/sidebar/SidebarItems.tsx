import React, { useEffect } from "react";
import Menuitems from "./MenuItems";
import MenuitemsAdmin from "./MenuItemsAdmin";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const auth = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    console.log({ auth });
  }, [auth]);

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
