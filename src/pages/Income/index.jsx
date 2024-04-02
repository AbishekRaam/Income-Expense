import React,{useEffect, useState} from "react";
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
import { db } from "../../firebase-config";
import AddIncome from "./Tablecontainer";
import CardData from "./cardData";
import { collection, getDocs } from "firebase/firestore";
import { useStateContext } from "../../Context/ContextProvider";
import TableContainer from "../Table/TableContainer";
import Table from "../Table/TableContainer";

const Income = (props) => {

  document.title = "SST-Invoice";
const {income} = useStateContext()
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
          <AddIncome />
          {/* <Row>
          {
            income.map((data)=>(
              <CardData date={data.date} description={data.description} amount={data.income} />
            ))
          }
          </Row> */}
          <Table data={income} />
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