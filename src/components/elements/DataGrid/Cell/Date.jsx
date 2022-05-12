import { Box, Text, TextInput } from '@mantine/core';
import { useClickOutside, useMergedRef } from '@mantine/hooks';
import { useMemo, useRef, useState } from 'react';

import { formatDate } from '@util/formatDate.js';
import { updateCellText } from '@store/slice/tableSlice.js';
import { useDispatch } from 'react-redux';

const CellDate = ({ value, column, row, isDisabledEdit = false }) => {
  const { id: rowIdx } = row;
  const { id: colIdx } = column;
  const initValue = useMemo(() => {
    return formatDate(new Date(value));
  }, [value]);

  const dispatch = useDispatch();
  const cellValue = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const refClickOutside = useClickOutside(() => {
    setIsEditing(false);
    dispatch(
      updateCellText({
        rowIdx,
        colIdx,
        value: cellValue.current.value,
      }),
    );
  });

  const mergedRef = useMergedRef(cellValue, refClickOutside);

  const handleChange = (e) => {
    cellValue.current.value = e.target.value;
  };

  return (
    <Box className="relative" onClick={() => setIsEditing(true)}>
      {!isDisabledEdit && isEditing && (
        <TextInput
          className="min-w-55 absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 transform shadow-md"
          defaultValue={initValue}
          onChange={handleChange}
          ref={mergedRef}
        />
      )}
      <Text className="overflow-x-hidden whitespace-nowrap">{initValue}</Text>
    </Box>
  );
};

export { CellDate };
