import { useState } from 'react';
import './table.css';

const TableImplement = ({ rows, columns }) => {
  return (
    <table className='table'>
      <tbody>
        {Array.from({ length: rows }).map((_, row) => {
          return (
            <tr key={`row-${row}`}>
              {Array.from({ length: columns }).map((_, col) => {
                return (
                  <td key={`col-${col}`}>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const GenerateTable = () => {
  const [rows, setRow] = useState();
  const [columns, setColumn] = useState();

  return (
    <div className='wrapper'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Obtain data from the form.
          const data = new FormData(e.target);

          const rows = data.get('rows');
          setRow(Number(rows));
          const columns = data.get('columns');
          setColumn(Number(columns));
        }}
      >
        <div>
          <label htmlFor='rowInput'>Rows</label>
          <input
            id='rowInput'
            name='rows'
            type='number'
            defaultValue={rows}
            min='1'
          />
        </div>
        <div>
          <label htmlFor='columnsInput'>Columns</label>
          <input
            id='columnsInput'
            name='columns'
            type='number'
            defaultValue={columns}
            min='1'
          />
        </div>
        <button type='submit'> submit </button>
      </form>

      {Boolean(rows) && Boolean(columns) && (
        <TableImplement rows={rows} columns={columns} />
      )}
    </div>
  );
};
