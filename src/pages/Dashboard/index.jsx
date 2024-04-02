import PropTypes from "prop-types";
import React, { useEffect } from "react";
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
import { useStateContext } from "../../Context/ContextProvider.jsx";
const Dashboard = props => {
  document.title = "SST-Invoice";
  const {expense,income} = useStateContext()
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
        
        <Tablecontainer exspense={expense} income={income}  revenue={income} />

        {/* <Row>
          <Col>
            <Cardcontainer />
          </Col>
        </Row> */}

        <Card className="mt-3">
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
