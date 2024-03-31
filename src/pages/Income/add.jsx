import React from 'react';
import PropTypes from "prop-types";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
//i18n
import { withTranslation } from "react-i18next";
// Form Mask
import InputMask from "react-input-mask"


const Add = (props) => {
  return (
    <div className='page-content'>

      <Container fluid>
        {/* Render Breadcrumb */}
        <Breadcrumbs
          title={props.t("Insert")}
          breadcrumbItem={props.t("Insert")}
        />
      </Container>

      <Row className='d-flex justify-content-center'>
      <Col lg={8} >
        <Card className='border border-dark'>
          <CardBody>
            <CardTitle className="mb-4">Insert New Income</CardTitle>

            <Form>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-firstname-Input"
                  className="col-sm-3 col-form-label"
                >
                  Income Description
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    className="form-control"
                    id="horizontal-firstname-Input"
                    placeholder="Enter Description"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-email-Input"
                  className="col-sm-3 col-form-label"
                >
                  Income Amount
                </Label>
                <Col sm={9}>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-phoneno-input3"
                  placeholder="Enter Your Amount"
                />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-password-Input"
                  className="col-sm-3 col-form-label"
                >
                  Date
                </Label>
                <Col sm={9}>
                <InputMask
                  mask="99/99/9999"
                  value={props.value}
                  className="form-control input-color"
                  onChange={props.onChange}
                >     
                </InputMask>
                </Col>
              </div>

              <div className="row justify-content-end">
                <Col sm={9}>
                  <div className=''>
                    <Button
                      type="submit"
                      color="primary"
                      className="w-md mx-2 my-2"
                    >
                      Save
                    </Button>

                    <Button
                      type="submit"
                      color="success"
                      className="w-md mx-2 my-2"
                    >
                      Back
                    </Button>
                  </div>
                </Col>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </Row>
    </div>
  )
}

Add.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};


export default withTranslation()(Add);