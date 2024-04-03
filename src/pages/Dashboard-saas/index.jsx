import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Components
import CardUser from "./card-user";
import CardWelcome from "./card-welcome";
import MiniWidget from "./mini-widget";
import Earning from "./earning";
import SalesAnalytics from "./sales-analytics";
import Revenue from "./revenue";
import TotalSellingProduct from "./total-selling-product";
import { useStateContext } from "../../Context/ContextProvider";
import { getTotalAmount, getToatalRevenue, getTotalExpenses } from "../../utils/utils.js"
// import Tasks from "./tasks";
// import ChatBox from "./chat-box";

const DashboardSaas = (props) => {

  const {income, expense} = useStateContext();

  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Income",
      value: `$ ${getTotalAmount(income)}`,
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: `$ ${getToatalRevenue(income)}`,
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-out",
      title: "Expenses",
      value: `$ ${getTotalExpenses(expense)}`,
      badgeValue: "0%",
      color: "warning",
      desc: "From previous period",
    },
  ];

  //meta title
  document.title =
    "Saas Dashboard | Skote - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Income" />

          {/* Card User */}
          {/* <CardUser /> */}

          <Row>
            {/* welcome card */}
            <CardWelcome />

            <Col xl="8">
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} />
              </Row>
            </Col>
          </Row>

          <Row>
            {/* earning */}
            <Earning dataColors='["--bs-primary"]' />

            {/* sales anytics */}
            <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' />
          </Row>

          <Row >
            <Revenue dataColors='["--bs-success"]'/>
          </Row>

          {/* <Row>
            <TotalSellingProduct />
            <Tasks />
            <ChatBox />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardSaas;
