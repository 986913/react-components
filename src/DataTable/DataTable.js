import React, { useState } from 'react';
import './table.css';
import { Books, Columns } from './constants';

export const DataTable = () => {
  const [books, setBooks] = useState(Books);
  const [columns, setColumns] = useState(Columns);

  const handleRemove = (index) => {
    let arr = [...books];
    arr.splice(index, 1);
    setBooks(arr);
  };
  const updateCount = (index, count) => {
    let arr = [...books];
    arr[index].count += count;
    setBooks(arr);
  };
  const calcTotalPrice = () =>
    books.reduce((acc, cur) => (acc += cur.price * cur.count), 0);

  return (
    <div>
      <table>
        <tr>
          <th></th>
          {columns.map((col) => (
            <th key={col.dataIndex}>{col.title}</th>
          ))}
        </tr>

        <tbody>
          {books.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                {columns.map((col) => {
                  switch (col.dataIndex) {
                    case 'count':
                      return (
                        <td key={Math.random()}>
                          <button
                            onClick={(e) => updateCount(index, -1)}
                            disabled={item[col.dataIndex] <= 1}
                          >
                            -1
                          </button>
                          <span className='counter'>{item[col.dataIndex]}</span>
                          <button onClick={(e) => updateCount(index, 1)}>
                            +1
                          </button>
                        </td>
                      );
                    case 'action':
                      return (
                        <td key={Math.random()}>
                          <button onClick={(e) => handleRemove(index)}>
                            移除
                          </button>
                        </td>
                      );
                    default:
                      return <td key={Math.random()}>{item[col.dataIndex]}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>书籍的总价格为：{calcTotalPrice()}</h2>
    </div>
  );
};
