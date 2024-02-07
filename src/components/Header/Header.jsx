import React,{ useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import userData from "../../assets/data/userData";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "bikes",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfileData, setUserProfileData] = useState([]);
  const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

  useEffect(() => {
    
    setUserProfileData(userData);
    // Check local storage for "sessionToken" on component mount
    const sessionToken = localStorage.getItem('sessionToken');
    setIsLoggedIn(sessionToken !== null);
  }, []);
  
  return (
    <header className="header">
      

      

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <Row>
         
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
          <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-bike-line"></i>
                  <span>
                    picalti 
                  </span>
                </Link>
              </h1>
            </div> 
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
            
            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
            
            {isLoggedIn ? (
                 <div className="user-info d-flex align-items-center gap-3">

                  {userProfileData[0].avatarUrl && (
                    <img
                      src={userProfileData[0].avatarUrl}
                      alt="User Profile"
                      className="user-profile-pic"
                    />
                  )}
                  {/* Display the username */}
                  <span>{userProfileData[0].username}</span>
                  <Link to="/login" className="d-flex align-items-center gap-1">
                        <i className="ri-logout-circle-line"></i> Login
                      </Link>
                </div>
                ) : (
                  // Render login and registration buttons if not logged in
                  <Col lg="1" md="1" sm="1">
                    <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                      <Link to="/login" className="d-flex align-items-center gap-1">
                        <i className="ri-login-circle-line"></i> Login
                      </Link>

                      <Link to="/register" className="d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> Register
                      </Link>
                    </div>
                  </Col>
                  )}
          </div>
          </Row>
        </Container>
      </div>
    </header>
  );
};

export default Header;
