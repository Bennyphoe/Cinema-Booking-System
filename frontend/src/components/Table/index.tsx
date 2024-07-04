import { ReactElement, Children, isValidElement } from "react";
import Column from "../Column";
import { ColumnProps } from "../Column";

type TableProps<T> = {
  dataSource: T[];
  children: ReactElement<ColumnProps<T>> | ReactElement<ColumnProps<T>>[];
}



const Table = <T extends object>({ dataSource, children }: TableProps<T>) => {
  // Extract column props from children
  const columns = Children.toArray(children).map(child => {
    if (isValidElement<ColumnProps<T>>(child) && child.type === Column) {
      return child.props;
    }
    return null;
  }).filter(Boolean) as ColumnProps<T>[];

  return (
    <table className="table">
      <thead className="table-light">
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{column.children(data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;