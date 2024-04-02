import React,{ useEffect, useState, useMemo } from 'react'
import TableContainer from "../../components/Common/TableContainer";
import { Date, Amount, Description, Actions } from './TableCol';
import {
    Button,
    Card,
    CardBody,
  } from "reactstrap";
const Table = ({data}) => {
    const columns = useMemo(
        () => [
    
          {
            Header: "Date",
            accessor: "date",
            filterable: false,
            disableFilters: true,
            Cell: cellProps => {
              return <Date {...cellProps} />;
            },
          },
    
          {
            Header: "Income Amount",
            accessor: "income",
            disableFilters: true,
            filterable: false,
            Cell: cellProps => {
              return <Amount {...cellProps} />;
            },
          },
          {
            Header: "Income Type",
            accessor: "type",
            disableFilters: true,
            filterable: false,
            Cell: cellProps => {
              return <Amount {...cellProps} />;
            },
          },
    
          {
            Header: "Description",
            accessor: "description",
            disableFilters: true,
            filterable: false,
            Cell: cellProps => {
              return <Description {...cellProps} />;
            },
          },
         
          {
            Header: "Actions",
            accessor: "id",
            disableFilters: true,
            Cell: cellProps => {
              return <Actions {...cellProps}  />;
            },
          },
    
        ]
        ,
        []
      );
  return (
    <React.Fragment>
    {/* <div className="page-content"> */}
    <Card>
      <CardBody>
        <div className="mb-4 h4 card-title m-3">Income</div>
        <TableContainer
          columns={columns}
          data={data}
          isGlobalFilter={false}
          isAddOptions={false}
          isPagination={true}
          iscustomPageSizeOptions={false}
          customPageSize={10}
          pagination="pagination pagination-rounded justify-content-end mb-2"
        />
      </CardBody>
    </Card>
  </React.Fragment>
  )
}

export default Table