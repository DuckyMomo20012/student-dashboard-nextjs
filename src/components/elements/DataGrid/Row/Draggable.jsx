import { Draggable } from 'react-beautiful-dnd';
import { RowHandler } from './Handler.jsx';

const RowDraggable = ({ draggableId, index, row }) => {
  // NOTE: We don't merge style from getRowProps with draggableProps because we
  // want full width row!!!
  // NOTE: content-open-quote to fake data and set default height for row
  return (
    <Draggable draggableId={draggableId} index={index} key={draggableId}>
      {(provided) => {
        return (
          <tr
            className="!first-of-type:border-t !last-of-type:border-b hover:children:opacity-100 relative flex !bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <RowHandler
              dragHandleProps={provided.dragHandleProps}
              indexRow={index}
              key="handler"
            />
            {row.cells.map((cell, indexCell) => (
              <td
                {...cell.getCellProps()}
                className="!children:(w-full min-h-10) children:(px-10px py-7px) !flex items-center !p-0 last:flex-grow"
                key={indexCell}
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      }}
    </Draggable>
  );
};

export { RowDraggable };
