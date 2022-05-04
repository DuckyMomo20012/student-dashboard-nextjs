import { Draggable } from 'react-beautiful-dnd';
import { RowHandler } from './Handler.jsx';

const RowBody = ({ draggableId, index, row }) => {
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
            // {...row.getRowProps()}
            {...provided.draggableProps}
          >
            <RowHandler
              dragHandleProps={provided.dragHandleProps}
              indexRow={index}
            />
            {row.cells.map((cell, indexCell) => (
              <td
                {...cell.getCellProps()}
                className="last:(flex-grow after:content-open-quote after:invisible) border"
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

export { RowBody };
