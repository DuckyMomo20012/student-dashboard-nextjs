import { Draggable } from 'react-beautiful-dnd';
import { RowMenu } from './Menu.jsx';

const RowBody = ({ draggableId, index, row }) => {
  // NOTE: We don't merge style from getRowProps with draggableProps because we want full width row!!!
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => {
        return (
          <tr
            className="!first-of-type:border-t !last-of-type:border-b hover:children:opacity-100 relative flex !bg-white"
            ref={provided.innerRef}
            // {...row.getRowProps()}
            {...provided.draggableProps}
          >
            <RowMenu dragHandleProps={provided.dragHandleProps} />
            {row.cells.map((cell, indexCell) => (
              <td
                {...cell.getCellProps()}
                className="!last:flex-grow border"
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
