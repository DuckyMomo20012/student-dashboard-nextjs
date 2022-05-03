import { Draggable } from 'react-beautiful-dnd';

const RowHead = ({ column, draggableId, index }) => {
  // NOTE: draggableProps will **empty** 'style' prop so we have to merge both styles
  // We don't want 'Resizer' in Header component to draggable
  const { style: headerStyle, ...headerProps } = column.getHeaderProps();
  const { isDragDisabled, isDropDisabled } = column;
  // NOTE: key for Draggable is REQUIRED!
  // NOTE: ALWAYS use draggableId for key prop

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      isDropDisabled={isDropDisabled}
      key={draggableId}
    >
      {(provided) => {
        const { style: draggableStyle, ...draggableProps } =
          provided.draggableProps;
        return (
          <th
            className="group relative last:min-w-min last:flex-grow "
            ref={provided.innerRef}
            {...draggableProps}
            {...headerProps}
            style={{ ...headerStyle, ...draggableStyle }}
          >
            {column.render('Header', {
              dragHandleProps: provided.dragHandleProps,
            })}
          </th>
        );
      }}
    </Draggable>
  );
};

export { RowHead };
