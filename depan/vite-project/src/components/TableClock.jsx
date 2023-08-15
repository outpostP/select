/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useTable, useSortBy } from 'react-table';
import { useMemo } from 'react';


export const SortableTable = ({ data }) => {
    const columns = useMemo(
        () => [
          { Header: 'ID', accessor: (_, index) => index + 1 },
          { Header: 'Clock In', accessor: 'hasIn', Cell: ({ value }) => (value ? 'Yes' : 'No') },
          { Header: 'Clock Out', accessor: 'hasOut', Cell: ({ value }) => (value ? 'Yes' : 'No') },
          { Header: 'Date', accessor: 'createdAt' },
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data }, useSortBy);
    
      return (
        <table {...getTableProps()} className="sortable-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-header-cell">
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-body">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="table-row">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };

