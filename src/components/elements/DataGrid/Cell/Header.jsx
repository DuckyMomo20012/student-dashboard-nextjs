import { Draggable } from 'react-beautiful-dnd';

const CellHeader = ({ column, draggableId, index }) => {
  // NOTE: draggableProps will **empty** 'style' prop so we have to merge both styles
  // We don't want 'Resizer' in Header component to draggable
  const { style: headerStyle, ...headerProps } = column.getHeaderProps();
  const { isDragDisabled } = column;
  // NOTE: key for Draggable is REQUIRED!
  // NOTE: ALWAYS use draggableId for key prop

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      key={draggableId}
    >
      {(providedEnabled) => {
        const { style: draggableStyle, ...draggableProps } =
          providedEnabled.draggableProps;

        return (
          <th
            ref={providedEnabled.innerRef}
            {...draggableProps}
            {...headerProps}
            style={{ ...headerStyle, ...draggableStyle }}
          >
            {column.render('Header', {
              dragHandleProps: providedEnabled.dragHandleProps,
            })}
          </th>
        );
      }}
    </Draggable>
  );
};

export { CellHeader };
