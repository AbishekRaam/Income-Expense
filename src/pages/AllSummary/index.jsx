import React from 'react'
import PropTypes from "prop-types";

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  TabContent,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { withTranslation } from "react-i18next";

import TableContent from './TableContent';
import BoxContent from './BoxContent';

const AllSummary = (props) => {
  return (
    <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={props.t("All Summary")}
              breadcrumbItem={props.t("All Summary")}
            />
          </Container>

          <TableContent />

          <BoxContent />

        </div>
    </React.Fragment>
  )
}
AllSummary.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};


export default withTranslation()(AllSummary);