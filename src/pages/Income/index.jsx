import React from "react";
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

import Tablecontainer from "./Tablecontainer";
import CardData from "./cardData";


const Income = (props) => {

  //meta title
  document.title = "Income | Skote - Vite React Admin & Dashboard Template";

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

          <Tablecontainer />

          <CardData />

        </div>
      </React.Fragment>
  )
}

Income.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};


export default withTranslation()(Income);