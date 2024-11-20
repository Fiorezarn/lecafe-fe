import DataTable from "react-data-table-component";

function DataTableComponent({
  columns,
  data,
  pagination,
  paginationServer,
  onChangePage,
  onChangeRowsPerPage,
  totalRows,
  expandedRows,
  onRowExpand,
  expandable,
  ExpandedComponent,
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
        paginationTotalRows={totalRows}
        expandableRows={expandable}
        expandableRowsComponent={ExpandedComponent}
        expandedRows={expandedRows}
        onRowExpand={onRowExpand}
      />
    </div>
  );
}

export default DataTableComponent;
