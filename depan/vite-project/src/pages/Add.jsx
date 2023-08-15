import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    base: '',
    role: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginToken = localStorage.getItem('loginToken');

    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      base: parseFloat(formData.base),
      role: parseInt(formData.role)
    };

    try {
      const response = await axios.post('http://localhost:8000/admi/register', requestData, {
        headers: {
          'Authorization': `Bearer ${loginToken}`
        }
      });
      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="400px" p={4} borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Base</FormLabel>
          <Input type="number" name="base" value={formData.base} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <Input type="number" name="role" value={formData.role} onChange={handleChange} />
        </FormControl>

        <Button type="submit" mt={4}>Submit</Button>
      </form>
    </Box>
  );
};

export default FormComponent;
