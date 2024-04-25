import React,{ useEffect, useState, useMemo } from 'react'
import TableContainer from "../../components/Common/TableContainer";
import { Date, Amount, Description, Expense } from './TableCol';
import { Card, CardBody, NavItem, NavLink, UncontrolledTooltip, Modal, Input, ModalHeader, ModalBody, Label, Form,Row, Col, FormFeedback } from "reactstrap";
import { Link } from 'react-router-dom';
import DeleteModal from "../../components/Common/DeleteModal";
import { formatAmount } from "../../utils/utils"

import * as Yup from "yup";
import { useFormik } from "formik";

import { db } from "../../firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Table = ({data}) => {

  const navData = ["All", "Salary","Cash", "Cheque", "Rent", "EB Bill", "Phone Bill", "Broad Band", "Maid", "Service", "Refreshment", "Team Lunch", "Transportation", "Commission", "GPay"];

  const [activeTab, setActiveTab] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      date: (order && order.date) || "",
      expense: (order && order.expense) || "",
      amount: (order && order.amount) || "",
      description: (order && order.description) || "",
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Please Enter Date"),
      expense: Yup.string().required("Please Enter Expense Category"),
      amount: Yup.string()
        .matches(/[0-9\.\-\s+\/()]+/, "Please Enter Valid Amount")
        .required("Please Enter Amount"),
      description: Yup.string().required("Please Enter Description"),
    }),
    onSubmit: async(values)=>{
      if(isEdit){
        const updateExpense={
          date: values.date,
          expense: values.expense,
          amount: formatAmount(values.amount),
          description: values.description,
        }
        //update expense data
        await updateDoc(doc(db, "Expense", order.id), updateExpense);
        validation.resetForm();
      }
      toggle();
    }
  })

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  //edit expense data
  const handleEdit =(val)=>{
    const order = val;
    setOrder({
      id: order.id,
      date: order.date,
      expense: order.expense,
      amount: order.amount,
      description: order.description,
    });
    setIsEdit(true);
    toggle();
  }

  //delete expense data
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDelete =( order )=>{
    setOrder(order);
    setDeleteModal(true);
  }
  const handleDeleteExpense = ()=>{
    deleteDoc(doc(db, 'Expense', order));
    setDeleteModal(false);
    setOrder("");
  }

  useEffect(()=>{
    if(activeTab === "All"){
      setFilteredData(data);
    }else{
      const filtered = data.filter(item => item.expense === activeTab);
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
          filterable: true,
          //disableFilters: true,
          Cell: cellProps => {
            return <Date {...cellProps} />;
          },
        },
  
        {
          Header: "Amount (INR)",
          accessor: "amount",
          //disableFilters: true,
          filterable: true,
          Cell: cellProps => {
            return <Amount {...cellProps} />;
          },
        },
        {
          Header: "Category",
          accessor: "expense",
          //disableFilters: true,
          filterable: true,
          Cell: cellProps => {
            return <Expense {...cellProps} />;
          },
        },
        {
          Header: "Description",
          accessor: "description",
          //disableFilters: true,
          filterable: true,
          Cell: cellProps => {
            return <Description {...cellProps} />;
          },
        },
        
        {
          Header: "Actions",
          accessor: "action",
          //disableFilters: true,
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
  
      ]
      ,
      []
    );

  return (
    <React.Fragment>
    <DeleteModal 
      show={deleteModal} 
      onDeleteClick={handleDeleteExpense}
      onCloseClick={()=> setDeleteModal(false)}
    />
    <Card>
      <CardBody>
        <div className="mb-4 h4 card-title m-3">Expenses Data</div>
        <ul className="nav nav-tabs nav-tabs-custom ">
          {navData.map((nav, index)=>(
            <NavItem key={index}>
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
        Edit Expense Data
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
                  invalid={(validation.touched.date && 
                    validation.errors.date) 
                    ? true 
                    : false
                  }                  
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
                  name="expense"
                  value={validation.values.expense || ""}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={(validation.touched.expense && 
                    validation.errors.expense) 
                    ? true 
                    : false
                  } 
                >
                  <option value="Salary">Salary</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Rent">Rent</option>
                  <option value="EB Bill">EB Bill</option>
                  <option value="Phone Bill">Phone Bill</option>
                  <option value="Broad Band">Broad Band</option>
                  <option value="Maid">Maid</option>
                  <option value="Service">Service</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Team Lunch">Team Lunch</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Commission">Commission</option>
                  <option value="GPay">GPay</option>
                </select>
                {validation.touched.expense &&
                  validation.errors.expense ? (
                  <FormFeedback type="invalid">
                    {validation.errors.expense}
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
                  value={formatAmount(validation.values.amount || "")}
                  //value={validation.values.amount || ""}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  invalid={(validation.touched.amount 
                    && validation.errors.amount) 
                    ? true 
                    : false
                  }
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
                  invalid={(validation.touched.description 
                    && validation.errors.description) 
                    ? true 
                    : false
                  }
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