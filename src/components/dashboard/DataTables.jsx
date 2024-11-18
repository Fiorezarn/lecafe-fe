import DataTable from "react-data-table-component";

function DataTableComponent({
  columns,
  data,
  pagination,
  paginationServer,
  onChangePage,
  onChangeRowsPerPage,
}) {
  return (
    <div className="overflow-auto">
      <DataTable
        className="border"
        columns={columns}
        data={data}
        responsive={true}
        pagination={pagination}
        paginationServer={paginationServer}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </div>
  );
}

export default DataTableComponent;
