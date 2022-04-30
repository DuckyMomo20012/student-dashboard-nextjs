import { Table } from '@mantine/core';
import { useMemo } from 'react';
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';

function DataGrid({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 250,
      maxWidth: 400,
    }),
    [],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, manualSortBy: false, defaultColumn },
      useSortBy,
      useResizeColumns,
      useBlockLayout,
    );

  return (
    <Table {...getTableProps()} fontSize="md" highlightOnHover striped>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="relative">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export { DataGrid };
