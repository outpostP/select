import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { RiDashboardLine, RiSettingsLine, RiUserLine, RiAdminFill, RiLogoutBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('daily');
  };

  const handleSettingsClick = () => {
    navigate('add');
  };

  const handleUsersClick = () => {
    navigate('monthly');
  };

  const handleAdminClick = () => {
    navigate('');
  };

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width="200px"
      paddingY="4"
      boxShadow="xl"
      backgroundColor="white"
    >
      <Flex direction="column">
        <Button variant="ghost" leftIcon={<Icon as={RiDashboardLine} />} onClick={handleDashboardClick}>
          Daily
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiSettingsLine} />} onClick={handleSettingsClick}>
          Add
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiUserLine} />} onClick={handleUsersClick}>
          Monthly
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiAdminFill} />} onClick={handleAdminClick}>
          Attendance
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiLogoutBoxLine} />} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default AdminSidebar;
