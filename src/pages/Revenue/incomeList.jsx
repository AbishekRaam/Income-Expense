import React from 'react';
import PropTypes from "prop-types";
import { Container } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

import { useStateContext } from "../../Context/ContextProvider";
import Table from "../Table/IncomeTableContainer";
import { Link } from 'react-router-dom';

const IncomeList = (props) => {
  //meta title
  document.title =
  "Income | SST-Income and Expenses";
  
  const {income} = useStateContext();

  return (
    <React.Fragment>
      
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Income")}
            breadcrumbItem={props.t("Income")}
          />
        </Container>

        <div className='d-flex justify-content-end mb-3 mx-2'>
          <Link to={'/add-income'} >
          <button className='btn bg-primary text-white rounded'>
            Add New Income
          </button>
          </Link>
        </div>

        <Table data={income} />
      </div>
    </React.Fragment>
  )
}

IncomeList.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(IncomeList);