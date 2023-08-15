/* eslint-disable no-unused-vars */
import { Box, Button, Center, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SortableTable } from "../components/TableClock";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const toast = useToast();
  const [tableData, setTableData] = useState([]);

 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await axios.get('http://localhost:8000/emp/atd', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleClockIn = async () => {
    try {
      // Get the login token from local storage
      const loginToken = localStorage.getItem('loginToken');

      
      // Make a POST request for clocking in
      // Pass the headers as a separate parameter
      var response = await axios.post(
        "http://localhost:8000/auth/clockin",
        null,  // Since you're making a POST request, you can pass null as the data
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      console.log(response)
      
  
      // Update the login token in local storage with the updated token received from the API response
      const updatedToken = response.data.token;
    
      console.log(updatedToken)
      localStorage.setItem('loginToken', updatedToken);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleClockOut = async () => {
    try {
      // Get the login token from local storage
      const loginToken = localStorage.getItem('loginToken');
      console.log(loginToken);
      
      // Make a POST request for clocking in
      // Pass the headers as a separate parameter
      var response = await axios.post(
        "http://localhost:8000/auth/Logout",
        null,  // Since you're making a POST request, you can pass null as the data
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Box bg="gray.100" p={4} rounded="md">
        <Heading as="h2" size="2xl" mb={4}>
          {time}
        </Heading>
        <Button colorScheme="green" mr={2} onClick={handleClockIn}>
          Clock In
        </Button>
        <Button colorScheme="red" onClick={handleClockOut}>
          Clock Out
        </Button>
        <SortableTable data={tableData} />
      </Box>
    </Center>
  );

};

export default Clock;
