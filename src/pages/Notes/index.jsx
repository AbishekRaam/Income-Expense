import React from 'react'
import PropTypes from "prop-types";

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import { withTranslation } from "react-i18next";

const Notes = (props) => {
  return (
    <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={props.t("Notes")}
              breadcrumbItem={props.t("Notes")}
            />
          </Container>


        </div>
    </React.Fragment>
  )
}

Notes.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};


export default withTranslation()(Notes);