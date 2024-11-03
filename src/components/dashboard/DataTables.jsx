import DataTable from "react-data-table-component";

function DataTableComponent({ columns, data }) {
  return (
    <div className="overflow-auto">
      <DataTable
        className="border"
        columns={columns}
        data={data}
        responsive={true}
        pagination
      />
    </div>
  );
}

export default DataTableComponent;
