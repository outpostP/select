import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/SidebarAdmin";

const AdminLayout = () => {
  return (
    <Flex>
      <Box  flex="0.25">
      <AdminSidebar />
      </Box>
      <Box flex="1" ml="120px" p="20px">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;
