import { DatePicker } from '@mantine/dates';
import { updateCellDate } from '@store/slice/tableSlice.js';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

const CellDate = ({ value, column, row, isDisabledEdit = false }) => {
  // NOTE: key for DatePicker is important
  const { id: rowIdx } = row;
  const { id: colIdx } = column;

  const initValue = useMemo(() => {
    if (value) {
      return new Date(value);
    }
    return '';
  }, [value]);

  const dispatch = useDispatch();
  function handleDateChange(e) {
    const dateValue = e;
    dispatch(updateCellDate({ rowIdx, colIdx, value: dateValue.toString() }));
  }

  return (
    <DatePicker
      clearable={false}
      disabled={isDisabledEdit}
      inputFormat="DD/MM/YYYY"
      key={initValue}
      onChange={handleDateChange}
      value={initValue}
      variant="unstyled"
    />
  );
};

export { CellDate };
