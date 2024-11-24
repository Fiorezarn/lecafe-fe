import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

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
  );
}

export default DataTableComponent;
DataTableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.bool,
  paginationServer: PropTypes.bool,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  totalRows: PropTypes.number,
  expandedRows: PropTypes.array,
  onRowExpand: PropTypes.func,
  expandable: PropTypes.bool,
  ExpandedComponent: PropTypes.elementType,
};
