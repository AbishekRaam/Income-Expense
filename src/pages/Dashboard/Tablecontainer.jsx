import React from 'react'
import {
  Badge,
  Table,
} from "reactstrap"
const Tablecontainer = ({exspense,income,revenue}) => {
  return (
    <Table className="table mb-0">
    <thead className="table-light">
      <tr>
        <th>#</th>
        <th>Income</th>
        <th>Expense</th>
        <th>Revenue</th>
      </tr>
    </thead>
    <tbody>
       <tr>
        <th scope="row">1</th>
        <td>
          <Badge color='success' className='ps-3 pe-3 pt-2 pb-2'>
          {income.length}
          </Badge>
          </td>
        <td>
          <Badge color='danger' className='ps-3 pe-3 pt-2 pb-2'>
          {exspense.length}
          </Badge>
          </td>
        
        <td>
        <Badge color='warning' className='ps-3 pe-3 pt-2 pb-2'>
          {revenue.length}
          </Badge>
          </td>
      </tr>
     {/* <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr> */}
    </tbody>
  </Table>
  )
}

export default Tablecontainer