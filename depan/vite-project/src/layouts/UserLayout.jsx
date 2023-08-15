import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NonAdminSidebar from "../components/SidebarUser";

const UserLayout = () => {
  return (
    <Box display="flex">
      <NonAdminSidebar /> {/* Render the sidebar component */}
      <Box flex="1" marginLeft="120px">
        <Outlet /> {/* Render the Outlet component */}
      </Box>
    </Box>
  );
};

export default UserLayout;
