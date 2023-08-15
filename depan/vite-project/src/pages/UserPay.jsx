import  { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [yearFilter, setYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('loginToken');
      try {
        const response = await axios.get('http://localhost:8000/emp/daily', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = [...data];

      if (yearFilter !== '') {
        filteredData = filteredData.filter((row) => {
          const year = new Date(row.createdAt).getFullYear();
          return year.toString() === yearFilter;
        });
      }

      if (monthFilter !== '') {
        filteredData = filteredData.filter((row) => {
          const month = new Date(row.createdAt).getMonth() + 1;
          return month.toString() === monthFilter;
        });
      }

      setFilteredData(filteredData);
    };

    filterData();
  }, [data, yearFilter, monthFilter]);

  return (
    <VStack align="start" spacing={4}>
      <chakra.div>
        <Input
          placeholder="Filter by Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </chakra.div>
      <chakra.div>
        <Input
          placeholder="Filter by Month (1-based)"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
        />
      </chakra.div>
      <Table variant="simple">
        <Thead>
          <Tr>
          
            <Th>Daily Salary</Th>
        
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((row) => (
            <Tr key={row.id}>
            
              <Td>{row.daily_salary}</Td>
              
              <Td>{row.createdAt}</Td>
              <Td>{row.updatedAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default DataTable;
