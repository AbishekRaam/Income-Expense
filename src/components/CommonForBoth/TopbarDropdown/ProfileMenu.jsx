import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";
import { useStateContext } from "../../../Context/ContextProvider";
// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import Cookies from "js-cookie";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";

const ProfileMenu = (props) => {

  const nav = useNavigate();

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const {url} = useStateContext()
  const [username, setusername] = useState(Cookies.get('name'));
  //const [username, setusername] = useState("Admin");

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.email);
      } else if (
        import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
        import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);
  
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      sessionStorage.removeItem("uid");      
      nav("/login");
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item px-3"
          id="page-header-user-dropdown"
          tag="button"
        >{
          url ? (<img
            className="rounded-circle header-profile-user"
            src={url}
            alt="Header Avatar"
          />):(username && <><div className='d-flex justify-content-center align-items-center bg-primary text-light rounded-circle header-profile-user' >{Cookies.get('name').split('')[0]}</div></>)
        }
          {/* <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span onClick={()=>handleSignOut()}>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
