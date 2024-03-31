import React from 'react'
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Table
} from "reactstrap";

const TableContent = () => {
  return (
    <div className='container-sm w-75  border border-secondary mb-5'>
      <div className="p-3 text-center border-bottom border-secondary h4">This Month Cost</div>
      <div className="d-flex justify-content-between p-3 border-bottom border-secondary">
        <span className='pt-1 h6'>Total Income</span>
        <span className='bg-primary p-1 text-white rounded'>2000.00</span>
      </div>
      <div className="d-flex justify-content-between p-3 border-bottom border-secondary">
        <span className='pt-1 h6'>Total Expenses</span>
        <span className='bg-danger p-1 text-white rounded'>500.00</span>
      </div>
      <div className="d-flex justify-content-between p-3 ">
        <span className='pt-1 h6'>Total Income</span>
        <span className='bg-primary p-1 text-white rounded'>1500</span>
      </div>
    </div>
  )
}

export default TableContent