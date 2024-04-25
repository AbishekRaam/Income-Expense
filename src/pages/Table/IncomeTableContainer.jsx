import React,{ useEffect, useState, useMemo } from 'react'
import TableContainer from "../../components/Common/TableContainer";
import { Date, Amount, Description, Client, Type } from './TableCol';
import { Button, Card, CardBody, NavItem, NavLink, UncontrolledTooltip, Modal, Input, ModalHeader, ModalBody, Label, Form,Row, Col, FormFeedback } from "reactstrap";
import { Link } from 'react-router-dom';
import DeleteModal from "../../components/Common/DeleteModal";
import { formatAmount } from "../../utils/utils"

import * as Yup from "yup";
import { useFormik } from "formik";

import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Table = ({data}) => {

  const navData = ["All","Revenue", "Cash", "Loan", "Debt"];

  const [activeTab, setActiveTab] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      date: (order && order.date) || "",
      type: (order && order.type) || "",
      clientName: (order && order.clientName) || "-",
      amount: (order && order.amount) || "",
      description: (order && order.description) || "",
    }, 
    validationSchema: Yup.object({
      date: Yup.string().required("Please Enter Date"),
      type: Yup.string().required("Please Enter Income category"),
      clientName: Yup.string().required("Please Enter Client Name"),
      amount: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "Please Enter Valid Amount")
        .required("Please Enter Amount"),
      description: Yup.string().required("Please Enter Description"),
    }),
    onSubmit: async(values) =>{
      if(isEdit){
        const updateIncome ={
          date: values.date,
          type: values.type,
          clientName: values.clientName,
          amount: formatAmount(values.amount),
          description: values.description,
        };
        //update income data
        await updateDoc(doc(db, "Income", order.id), updateIncome);
        validation.resetForm();
      }
      toggle();
    }
  });

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  //edit income data
  const handleEdit =(val)=>{
    const order = val;
    setOrder({
      id: order.id,
      date: order.date,
      type: order.type,
      clientName: order.clientName,
      amount: order.amount,
      description: order.description,
    });
    setIsEdit(true);

    toggle();
  } 

  //delete income data
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete =( order )=>{
    setOrder(order);
    setDeleteModal(true);
  }
  const handleDeleteIncome = ()=>{
    deleteDoc(doc(db, 'Income', order));
    setDeleteModal(false);
    setOrder("");
  }

  useEffect(()=>{
    if(activeTab === "All"){
      setFilteredData(data);
    }else{
      const filtered = data.filter(item => item.type === activeTab);
      setFilteredData(filtered);
    }
  },[activeTab, data])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const columns = useMemo(
      () => [
        {
          Header: "Date",
          accessor: "date",
          filterable: false,
          disableFilters: true,
          Cell: cellProps => {
            return <Date {...cellProps} />;
          },
        },
        {
          Header: "Amount (INR)",
          accessor: "amount",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return <Amount {...cellProps} />;
          },
        },
        {
          Header: "Category",
          accessor: "type",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return <Type {...cellProps} />;
          },
        },
        {
          Header: "Client",
          accessor: "clientName",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return <Client {...cellProps} />;
          },
        },
        {
          Header: "Description",
          accessor: "description",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return <Description {...cellProps} />;
          },
        },
        
        {
          Header: "Actions",
          accessor: "action",
          disableFilters: true,
          Cell: cellProps => {
            return (
              <div className="d-flex gap-3">
                <Link
                  to="#"
                  className="text-success"
                  onClick={()=>{
                    handleEdit(cellProps.row.original)
                  }}
                >
                  <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
                <Link
                  to="#"
                  className="text-danger"
                  onClick={() => handleDelete(cellProps.row.original.id)}
                >
                  <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </div> 
            )
          },
        }, 
      ],
      []
  );
    
  return (
    <React.Fragment>
    <DeleteModal 
      show={deleteModal} 
      onDeleteClick={handleDeleteIncome}
      onCloseClick={()=> setDeleteModal(false)}
    />
    <Card>
      <CardBody>
        <div className="mb-4 h4 card-title m-3">Income Data</div>
        <ul className="nav nav-tabs nav-tabs-custom">
        {navData.map((nav, index)=>(
          <NavItem>
            <NavLink
              className={activeTab == `${nav}` ? "active" : ""}
              onClick={() => {
                toggleTab(`${nav}`);
              }}
            >
              {nav}
            </NavLink>
          </NavItem>
        ))}
        </ul>
        <div className="mt-3">
        <TableContainer
          tableClass="table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
          columns={columns}
          data={filteredData}
          isGlobalFilter={false}
          isAddOptions={false}
          isPagination={true}
          iscustomPageSizeOptions={false}
          customPageSize={10}
          pagination="pagination pagination-rounded justify-content-end mb-2"
        />
        </div>
      </CardBody>
    </Card>
    <Modal isOpen={modal} toggle={toggle} >
      <ModalHeader tag="h4">
        Edit Income Data
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col className="col-12">
              <div className="mb-3">
                <Label className="form-label">Date</Label>
                <input
                  className='form-control'
                  type="date"
                  name="date"
                  value={validation.values.date}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={validation.touched.date && validation.errors.date ? true : false}                  
                />
                {validation.touched.date &&
                  validation.errors.date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.date}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Category</Label>
                <select
                  className="select2-selection form-control"
                  name="type"
                  value={validation.values.type || ""}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={validation.touched.type && validation.errors.type ? true : false} 
                >
                  <option value="Revenue">Revenue</option>
                  <option value="Debt">Debt</option>
                  <option value="Loan">Loan</option>
                  <option value="Cash">Cash</option>
                </select>
                {validation.touched.type &&
                  validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
              
              <div className="mb-3">
                <Label className="form-label">Client</Label>
                <Input
                  name='clientName'
                  type="text"
                  className="form-control"
                  id="horizontal-firstname-Input"
                  placeholder="Enter Client"
                  value={validation.values.clientName || ""}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={validation.touched.clientName && validation.errors.clientName ? true : false} 
                />
                {validation.touched.clientName &&
                  validation.errors.clientName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.clientName}
                  </FormFeedback>
                ) : null}
              </div>
              
              <div className="mb-3">
                <Label className="form-label">Amount (INR)</Label>
                <Input
                  name='amount'
                  type="text"
                  className="form-control"
                  id="horizontal-firstname-Input"
                  placeholder="Enter Income Amount"
                  //value={validation.values.amount || ""}
                  value={formatAmount(validation.values.amount || "")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={validation.touched.amount && validation.errors.amount ? true : false}
                />
                {validation.touched.amount &&
                  validation.errors.amount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.amount}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Description</Label>
                <Input
                  name='description'
                  id="message"
                  className="form-control"
                  placeholder="Enter Your Message"
                  value={validation.values.description || ""}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={validation.touched.description && validation.errors.description ? true : false}
                />
                {validation.touched.description &&
                  validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success save-user"
                >
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  </React.Fragment>
  )
}

export default Table