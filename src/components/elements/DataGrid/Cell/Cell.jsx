import { CellDate } from './Date.jsx';
import { CellText } from './Text.jsx';

const components = {
  text: CellText,
  date: CellDate,
  menu: CellText,
};

const Cell = (props) => {
  const { columnType } = props.column;
  const CellType = components[columnType];
  return <CellType {...props} />;
};

export { Cell };
