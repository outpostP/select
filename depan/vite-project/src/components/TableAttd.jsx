import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td,  } from '@chakra-ui/react';
import axios from 'axios';

const AttendanceAll = () => {
  const [data, setData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [empIdFilter, setEmpIdFilter] = useState('');
  const [createdAtYearFilter, setCreatedAtYearFilter] = useState('');
  const [createdAtMonthFilter, setCreatedAtMonthFilter] = useState('');
  const [createdAtDayFilter, setCreatedAtDayFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginToken = localStorage.getItem('loginToken');
        const response = await axios.get('http://localhost:8000/admi/atd', {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  const handleEmpIdFilterChange = (event) => {
    const filterValue = event.target.value;
    setEmpIdFilter(filterValue === '' ? '' : parseInt(filterValue));
  };

  const handleCreatedAtYearFilterChange = (event) => {
    setCreatedAtYearFilter(event.target.value);
  };

  const handleCreatedAtMonthFilterChange = (event) => {
    setCreatedAtMonthFilter(event.target.value);
  };

  const handleCreatedAtDayFilterChange = (event) => {
    setCreatedAtDayFilter(event.target.value);
  };

  const filteredData = data
    .filter((item) =>
      empIdFilter === '' || item.emp_id === empIdFilter
    )
    .filter((item) =>
      createdAtYearFilter === '' ||
      new Date(item.createdAt).getFullYear().toString() === createdAtYearFilter
    )
    .filter((item) =>
      createdAtMonthFilter === '' ||
      new Date(item.createdAt).getMonth().toString() === (parseInt(createdAtMonthFilter) - 1).toString()
    )
    .filter((item) =>
      createdAtDayFilter === '' ||
      new Date(item.createdAt).getDate().toString() === createdAtDayFilter
    )
    .sort((a, b) => {
      const valueA = a[sortedColumn];
      const valueB = b[sortedColumn];

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <Box>
      <Box mb="4">
        <input
          type="text"
          value={empIdFilter}
          onChange={handleEmpIdFilterChange}
          placeholder="Filter by emp_id"
        />
        <input
          type="text"
          value={createdAtYearFilter}
          onChange={handleCreatedAtYearFilterChange}
          placeholder="Filter by year"
        />
        <input
          type="text"
          value={createdAtMonthFilter}
          onChange={handleCreatedAtMonthFilterChange}
          placeholder="Filter by month"
        />
        <input
          type="text"
          value={createdAtDayFilter}
          onChange={handleCreatedAtDayFilterChange}
          placeholder="Filter by day"
        />
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('id')}>id</Th>
            <Th onClick={() => handleSort('hasIn')}>hasIn</Th>
            <Th onClick={() => handleSort('hasOut')}>hasOut</Th>
            <Th>emp_id</Th>
            <Th onClick={() => handleSort('createdAt')}>createdAt</Th>
            <Th onClick={() => handleSort('updatedAt')}>updatedAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.hasIn.toString()}</Td>
              <Td>{item.hasOut.toString()}</Td>
              <Td>{item.emp_id}</Td>
              <Td>{item.createdAt}</Td>
              <Td>{item.updatedAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AttendanceAll;
