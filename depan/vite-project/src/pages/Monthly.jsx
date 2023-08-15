import  { useState, useEffect } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import axios from "axios";

export default function SalaryList() {
  const [salaries, setSalaries] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admi/monthly",
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          }
        );
        setSalaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalaries();
  }, []);

  const handleButtonClick = async () => {
    try {
      const loginToken = localStorage.getItem("loginToken");
      
      await axios.post(
        "http://localhost:8000/admi/monthly",
        null,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
  
      // Fetch the updated salaries data after the API call
      const response = await axios.get(
        "http://localhost:8000/admi/monthly",
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
  
      setSalaries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSalaries = salaries.filter((salary) => {
    return (
      salary.createdAt.includes(yearFilter) &&
      salary.createdAt.includes(monthFilter)
    );
  }).map((salary) => ({
    ...salary,
    deduction_day: salary.deduction_day || 0, // Set default value if deduction_day is undefined
  }));

  return (
    <Box
      maxW="500px"
      mx="auto"
      p="4"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Button onClick={handleButtonClick}>Button</Button>

      <Input
        type="text"
        placeholder="Year"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Month"
        value={monthFilter}
        onChange={(e) => setMonthFilter(e.target.value)}
      />

<Table w="full">
  <Thead>
    <Tr>
      <Th>ID</Th>
      <Th>Monthly Salary</Th>
      <Th>Emp ID</Th>
      <Th>Created At</Th>
      <Th>Updated At</Th>
      <Th>Deduction Day</Th>
    </Tr>
  </Thead>
  <Tbody>
    {filteredSalaries.map((salary) => (
      <Tr key={salary.id}>
        <Td>{salary.id}</Td>
        <Td>{salary.monthly_salary}</Td>
        <Td>{salary.emp_id}</Td>
        <Td>{salary.createdAt}</Td>
        <Td>{salary.updatedAt}</Td>
        <Td>{salary.deduction_day}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>
    </Box>
  );
}
