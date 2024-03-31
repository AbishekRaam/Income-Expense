import PropTypes from "prop-types";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

import Tablecontainer from "./Tablecontainer";
import Cardcontainer from "./Card.jsx";
import Pie from './pie.jsx'

const Dashboard = props => {

  //meta title
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />
        </Container>
        
        <Tablecontainer />

        <Row>
          <Col>
            <Cardcontainer />
          </Col>
        </Row>

        <Card>
          <CardBody>
            <CardTitle>Pie Chart</CardTitle>
            <div id="pie-chart" className="e-chart">
              <Pie dataColors='["--bs-primary","--bs-info", "--bs-success"]'/>
            </div>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
