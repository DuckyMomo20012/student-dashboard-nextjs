import { ScrollArea, Table } from '@mantine/core';
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
      // width: 250,
      // maxWidth: 400,
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
    <ScrollArea className="w-1/1">
      <Table {...getTableProps()} fontSize="md" highlightOnHover striped>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="!w-1/1">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="last:min-w-min last:flex-grow"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="!w-1/1 !last-of-type:border-b-1"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border-r border-l border-solid last:flex-grow"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export { DataGrid };
