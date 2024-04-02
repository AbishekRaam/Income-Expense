import React from 'react'

import {Link, useLocation} from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { Breadcrumb } from 'reactstrap';



const Tablecontainer = () => {
  return (
    <div className='d-flex justify-content-end mb-3'>
     
        <Link to={'/add'} >
        <button className='btn bg-primary text-white rounded'>
          Add New Income
        </button>
        </Link>
        
      {/* </div> */}

    </div>
  )
}

export default withRouter(withTranslation()(Tablecontainer));