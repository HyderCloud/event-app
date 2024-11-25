import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TeamTabel() {
  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);

  const columnDefs = [
    { field: 'make', editable: true },
    { field: 'model', editable: true },
    { field: 'price', editable: true },
  ];

  const onCellValueChanged = (params) => {
    console.log('Updated row:', params.data); // Log the updated row data
    setRowData([...rowData]); // Update state if needed
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged} // Callback for when a cell value changes
      ></AgGridReact>
    </div>
  );
}

export default TeamTabel;
