import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState } from "react";
import sty from "../styles/NextNavbar.module.css";
import gstyle from "../styles/NextGlobal.module.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";

const NextNavbar = ({ user, logout }) => {
  return (
    <>
      <Navbar
        className={`${gstyle.global__background} ${sty.navbar} ${sty.navbar__upper_navbar}`}
        expand="xs"
        variant="dark"
      >
        <Container className={`${sty.navbar__brand_container}`}>
          <Navbar.Brand className={`${sty.navbar__brand}`} href="/">
            Code's Reviews
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Navbar
        className={`${gstyle.global__background} ${sty.navbar} ${sty.navbar__lower_navbar}`}
        expand="md"
        variant="dark"
      >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className={sty.navbar__lower_navbar__div}>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {user !== null ? (
                <>
                  <Nav.Link className={`${sty.navbar__link}`} href="#action1">
                    Account
                  </Nav.Link>
                  <Nav.Link className={`${sty.navbar__link}`} href="#action1">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className={`${sty.navbar__link}`} href="#action1">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
            <>
              <NavDropdown
                className={`${sty.navbar__nav_dropdown}`}
                title={<p>C</p>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>

              <Form className={`${sty.navbar__search_tech} d-flex`}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className={`mr-2 ${sty.navbar__search_tech_search_input}`}
                  aria-label="Search"
                />
                <Container
                  className={`${sty.navbar__search_tech_button_container}`}
                >
                  <Button
                    className={`${sty.navbar__search_tech_button}`}
                    variant="outline-success"
                  >
                    Search
                  </Button>
                </Container>
              </Form>
            </>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NextNavbar;
