import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { RiDashboardLine, RiUserLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const NonAdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('pay'); // Replace '/dashboard' with your desired dashboard route
  };

  const handleProfileClick = () => {
    navigate(''); // Replace '/profile' with your desired profile route
  };

  return (
    <Box>
      <Flex direction="column">
        <Button variant="ghost" leftIcon={<Icon as={RiDashboardLine} />} onClick={handleDashboardClick}>
          Pay
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiUserLine} />} onClick={handleProfileClick}>
          Clocking
        </Button>
        <Button variant="ghost" leftIcon={<Icon as={RiLogoutBoxLine} />} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default NonAdminSidebar;
