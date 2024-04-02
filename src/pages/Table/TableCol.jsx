import React from 'react';
import { Link } from 'react-router-dom';

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap';


const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const Amount = (cell) => {
    return cell.value ? cell.value : '';
};

const Description = (cell) => {
    return cell.value ? cell.value : '';
};

const Actions = ({cell, request}) => {
    return (
        <UncontrolledDropdown className="ms-auto">
            <DropdownToggle
                className="text-muted font-size-14"
                tag="a"
                color="white"
            >
                <i className="mdi mdi-dots-horizontal"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
            
            </DropdownMenu>
        </UncontrolledDropdown>

    )
};
export {
    CheckBox,
    Date,
    Amount,
    Description,
    Actions
};