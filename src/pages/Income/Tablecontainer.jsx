import React from 'react'

import {Link, useLocation} from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";



const Tablecontainer = () => {
  return (
    <div>
      <div className='container-sm  border border-secondary mb-5 rounded'>
        <div className="d-flex justify-content-between align-items-center p-3">
          <span className='pt-1 h5'>Total Income</span>
          <span className='bg-success p-1 text-white rounded'>2000.00</span>
        </div>
        <div className="p-3 text-center border-top border-secondary h4">
          <Link to="/add"  className='h5 bg-primary text-white p-2 rounded'>Add New Income</Link>
        </div>
      </div>

    </div>
  )
}

export default withRouter(withTranslation()(Tablecontainer));