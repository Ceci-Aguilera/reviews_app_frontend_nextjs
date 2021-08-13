import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, createRef } from "react";
import gst from "../styles/NextGlobal.module.css";
import sty from "../styles/SimpleNavbar.module.css";
import { Navbar, Nav, Container } from "react-bootstrap";

const SimpleNavbar = ({ user, logout }) => {
  const [current_category, setCurrentCategory] = useState([]);

  return (
    <>
      <Navbar
        // bg="dark"
        variant="dark"
        className={`${gst.global__background} ${sty.navbar}`}
        expand="lg"
      >
        <Container>
          <Navbar.Brand className={`${sty.navbar__brand}`} href="/">
            Code's Reviews
          </Navbar.Brand>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
              <Container>

            {user !== null ? (
                <>
                <Nav.Link className={`${sty.navbar__link}`} href="#action1">
                  Account
                </Nav.Link>
                <Nav.Link className={`${sty.navbar__link}`} href="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
                <>
                <Nav.Link className={`${sty.navbar__link}`} href="/login">
                  Login
                </Nav.Link>
              </>
            )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default SimpleNavbar;
