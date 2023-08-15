import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    var response = null
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        response = await axios.post('http://localhost:8000/auth/login', {
          id,
          password,
        });
  
        console.log(response.data);
  
        localStorage.setItem('loginToken', response.data.token);
  
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem('role', decodedToken.role);
        
        // Check if the role is 1 (admin) and navigate to the admin route
        if (decodedToken.role === 1) {
          navigate('/admin');
          return;
        } else if (decodedToken.role !== 1) {
            navigate('/user');
            return;
        }
  
        toast({
          title: 'Login Successful',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
  
        toast({
          title: 'Login Failed',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

  return (
    <Box p={4}>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <form onSubmit={handleLogin}>
          <Stack
            spacing={4}
            maxW="400px"
            width={{ base: '90%', md: 'auto' }}
            px={6}
            py={8}
            bg="gray.200"
            borderRadius="md"
            boxShadow="md"
          >
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                bg="white"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="white"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Login
            </Button>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginPage;

