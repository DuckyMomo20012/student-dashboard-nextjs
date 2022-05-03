/* eslint-disable no-useless-return */

import { Box, ScrollArea, Table } from '@mantine/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { RowBody, RowHead } from '@element/DataGrid/index.js';
import {
  useBlockLayout,
  useColumnOrder,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { useCallback, useMemo } from 'react';

import cloneDeep from 'lodash/cloneDeep';

function DataGrid({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      // width: 250,
      // maxWidth: 400,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
    visibleColumns,
  } = useTable(
    { columns, data, manualSortBy: false, defaultColumn },
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    useColumnOrder,
  );

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (source.droppableId === 'thead') {
        const columns = visibleColumns;
        let updatedColumns = cloneDeep(visibleColumns);
        updatedColumns.splice(source.index, 1);
        const destinationCol = visibleColumns.filter(
          (col) => `${col.id}-head` === draggableId,
        );
        updatedColumns.splice(destination.index, 0, ...destinationCol);
        updatedColumns = updatedColumns.map((col, index) => {
          return {
            ...col,
            index,
          };
        });
        setColumnOrder(updatedColumns.map((col) => col.id));
      }
    },
    [visibleColumns, setColumnOrder],
  );

  return (
    <ScrollArea className="w-1/1">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className="!px-100px relative">
          <Table {...getTableProps()} fontSize="md">
            <thead>
              {headerGroups.map((headerGroup, indexHeader) => (
                <Droppable
                  direction="horizontal"
                  droppableId="thead"
                  key={indexHeader}
                  type="thead"
                >
                  {(providedDrop) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="!children:border-none !w-full"
                      ref={providedDrop.innerRef}
                      {...providedDrop.droppableProps}
                    >
                      {/* NOTE: Always use draggableId for key prop */}
                      {headerGroup.headers.map((column, indexCol) => {
                        return (
                          <RowHead
                            column={column}
                            draggableId={`${column.id}-head`}
                            index={indexCol}
                            key={`${column.id}-head`}
                          />
                        );
                      })}
                      {providedDrop.placeholder}
                    </tr>
                  )}
                </Droppable>
              ))}
            </thead>
            <Droppable droppableId="tbody" type="tbody">
              {(providedDrop) => (
                <tbody
                  {...getTableBodyProps()}
                  ref={providedDrop.innerRef}
                  {...providedDrop.droppableProps}
                >
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <RowBody
                        draggableId={`${row.id}-row`}
                        index={row.index}
                        key={`${row.index}-row`}
                        row={row}
                      />
                    );
                  })}
                  {providedDrop.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </Box>
      </DragDropContext>
    </ScrollArea>
  );
}

export { DataGrid };
