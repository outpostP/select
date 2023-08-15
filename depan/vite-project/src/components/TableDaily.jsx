/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import axios from 'axios';

function DailyTable() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await axios.get('http://localhost:8000/admi/daily', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setEmployees(response.data);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Failed to fetch employee data', error);
      }
    }

    fetchEmployeeData();
  }, []);

  const filteredEmployees = employees
    .filter((employee) => employee.emp_id.toString().includes(filter))
    .sort((a, b) => {
      if (sort === 'asc') {
        return a.emp_id - b.emp_id;
      } else {
        return b.emp_id - a.emp_id;
      }
    });

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Emp ID</Th>
          <Th>Daily Salary</Th>
          <Th>Created At</Th>
          <Th>Updated At</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <chakra.input
              type="text"
              placeholder="Filter by Emp ID"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Td>
        </Tr>
        {filteredEmployees.map((employee) => (
          <Tr key={employee.id}>
            <Td>{employee.emp_id}</Td>
            <Td>{employee.daily_salary}</Td>
            <Td>{employee.createdAt}</Td>
            <Td>{employee.updatedAt}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default DailyTable;