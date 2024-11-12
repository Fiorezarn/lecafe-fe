import DataTable from "react-data-table-component";

function DataTableComponent({ columns, data, expand }) {
  return (
    <div className="overflow-auto">
      <DataTable
        className="border"
        columns={columns}
        data={data}
        responsive={true}
        pagination
        expandableRows={expand}
        expandableRowsComponent={({ data }) => (
          <div style={{ padding: "10px" }}>
            <p>Map</p>
          </div>
        )}
      />
    </div>
  );
}

export default DataTableComponent;
