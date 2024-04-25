import React from 'react';
import PropTypes from "prop-types";
import { Container } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

import { useStateContext } from "../../Context/ContextProvider";
import Table from "../Table/ExpenseTableContainer";
import { Link } from 'react-router-dom';

const ExpenseList = (props) => {
  //meta title
  document.title =
  "Expenses | SST-Income and Expenses";

  const {expense} = useStateContext();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Expenses")}
            breadcrumbItem={props.t("Expenses")}
          />
        </Container>

        <div className='d-flex justify-content-end mb-3 mx-2'>
          <Link to={'/add-expense'} >
            <button className='btn bg-primary text-white rounded'>
              Add New Expenses
            </button>
          </Link>    
        </div>

        <Table data={expense} />
      </div>
    </React.Fragment>
  )
}

ExpenseList.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(ExpenseList);