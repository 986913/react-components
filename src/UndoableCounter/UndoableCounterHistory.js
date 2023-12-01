import React from 'react';

export const UndoableCounterHistory = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>

      <tbody>
        {history.map((item, index) => {
          const { operation, oldCounter, newCounter } = item;
          return (
            <tr key={index}>
              <td>{operation}</td>
              <td>{oldCounter}</td>
              <td>{newCounter}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
