import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Button, Badge } from 'reactstrap';
import moment from 'moment'

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? moment(cell.value).format('DD-MM-YYYY') : ''}</Link>
    );
};
const Amount = (cell) => {
    return cell.value ? cell.value : '';
};
const Client = (cell) => {
    return cell.value ? cell.value : '-';
};
const Type = (cell) => {
    switch (cell.value) {
        case "Revenue":
            return <Badge className="bg-success font-size-10">Revenue</Badge>
        case "Debt":
            return <Badge className="bg-warning font-size-10">Debt</Badge>
        case "Cash":
            return <Badge className="bg-danger font-size-10">Cash</Badge>
        case "Loan":
            return <Badge className="bg-info  font-size-10">Loan</Badge>
    }
};
const Expense = (cell) =>{
    switch(cell.value) {
        case "Salary":
            return <Badge className="bg-success font-size-10">Salary</Badge>
        case "Cash":
            return <Badge className="bg-secondary font-size-10">Cash</Badge>
        case "Cheque":
            return <Badge className="bg-danger font-size-10">Cheque</Badge>
        case "Service":
            return <Badge className="bg-warning font-size-10">Service</Badge>
        case "Rent":
            return <Badge className="bg-info font-size-10">Rent</Badge>
        case "EB Bill":
            return <Badge className="bg-secondary font-size-10">EB Bill</Badge>
        case "Phone Bill":
            return <Badge className="bg-danger font-size-10">Phone Bill</Badge>
        case "Broad Band":
            return <Badge className="bg-primary font-size-10">Broad Band</Badge>
        case "Maid":
            return <Badge className="bg-danger font-size-10">Maid</Badge>
        case "Refreshment":
            return <Badge className="bg-secondary font-size-10">Refreshment</Badge>
        case "Team Lunch":
            return <Badge className="bg-success font-size-10">Team Lunch</Badge>
        case "Transportation":
            return <Badge className="bg-warning font-size-10">Transportation</Badge>
        case "Commission":
            return <Badge className="bg-info font-size-10">Commission</Badge>
        case "GPay":
            return <Badge className="bg-danger font-size-10">GPay</Badge>
    }
};
const Description = (cell) => {
    return cell.value ? cell.value : '';
};

// const Actions = ({cell, request}) => {
//     return (
//         <UncontrolledDropdown className="ms-auto">
//             <DropdownToggle
//                 className="text-muted font-size-14"
//                 tag="a"
//                 color="white"
//             >
//                 <i className="mdi mdi-dots-horizontal"></i>
//             </DropdownToggle>
//             {/* <DropdownMenu className="dropdown-menu-end">
            
//             </DropdownMenu> */}
//         </UncontrolledDropdown>

//     )
// };
export {
    CheckBox,
    Date,
    Amount,
    Client,
    Type,
    Expense,
    Description,
    //Actions
};