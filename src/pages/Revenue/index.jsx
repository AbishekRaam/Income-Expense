import React from 'react'
import PropTypes from "prop-types";

import {
  Container,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { withTranslation } from "react-i18next";

import FormRevenue from "./Form";

const Revenue = (props) => {
  //meta title
  document.title =
  "Income ";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Income")}
            breadcrumbItem={props.t("Income Form")}
          />
        </Container>

        <FormRevenue />

      </div>
    </React.Fragment>
  )
}

Revenue.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Revenue);