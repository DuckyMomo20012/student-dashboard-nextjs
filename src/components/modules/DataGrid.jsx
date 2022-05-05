/* eslint-disable no-useless-return */

import { Box, ScrollArea, Table } from '@mantine/core';
import {
  CellBody,
  CellHeader,
  Header,
  HeaderLabel,
  RowBody,
} from '@element/DataGrid/index.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { addLastRow, updateData } from '@store/slice/tableSlice.js';
import {
  useBlockLayout,
  useColumnOrder,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reorderColumns } from '@util/reorderColumns.js';

function DataGrid() {
  // const [records, setRecords] = useState(data);
  const records = useSelector((state) => state.table.data);
  const columns = useSelector((state) => state.table.columns);
  const dispatch = useDispatch();

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      Cell: CellBody,
      Header,
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
    {
      columns,
      data: records,
      manualSortBy: false,
      defaultColumn,
    },
    useSortBy,
    useResizeColumns,
    useBlockLayout,
    useColumnOrder,
  );

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

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
        const updatedColumns = reorderColumns(
          visibleColumns,
          source.index,
          destination.index,
        );
        setColumnOrder(updatedColumns.map((col) => col.id));
      }

      if (source.droppableId === 'tbody') {
        const updatedRecords = reorderColumns(
          records,
          source.index,
          destination.index,
        );
        dispatch(updateData(updatedRecords));
      }
    },
    [visibleColumns, setColumnOrder, records, dispatch],
  );

  return (
    <ScrollArea className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className="!px-100px relative">
          <Table {...getTableProps()} fontSize="md">
            <thead>
              {headerGroups.map((headerGroup, indexHeader) => (
                <tr
                  key={indexHeader}
                  {...headerGroup.getHeaderGroupProps()}
                  className="!children:border-none !w-full"
                >
                  <>
                    <Droppable
                      direction="horizontal"
                      droppableId="thead"
                      type="TABLE_HEADER"
                    >
                      {(providedDrop) => (
                        <div
                          className="!children:border-none flex"
                          ref={providedDrop.innerRef}
                          {...providedDrop.droppableProps}
                        >
                          {headerGroup.headers
                            .slice(0, -1)
                            .map((column, indexCol) => {
                              return (
                                <CellHeader
                                  column={column}
                                  draggableId={`${column.id}-head`}
                                  index={indexCol}
                                  key={`${column.id}-head`}
                                />
                              );
                            })}
                          {providedDrop.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <th className="w-full">
                      {headerGroup.headers
                        .slice(-1)
                        .map((column) => column.render('Header'))}
                    </th>
                  </>
                </tr>
              ))}
            </thead>
            <tbody>
              <Droppable droppableId="tbody" type="TABLE_BODY">
                {(providedDrop) => (
                  <div
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
                  </div>
                )}
              </Droppable>
              <tr
                className="flex border"
                onClick={() => dispatch(addLastRow())}
              >
                <td className="!children:p-0 flex-grow">
                  <HeaderLabel color="red" icon="ic:outline-add" label="New" />
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
      </DragDropContext>
    </ScrollArea>
  );
}

export { DataGrid };
