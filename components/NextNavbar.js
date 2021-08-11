import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, createRef } from "react";
import gst from "../styles/NextGlobal.module.css";
import sty from "../styles/NextNavbar.module.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
  InputGroup,
} from "react-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  Typeahead,
  Token,
  Highlighter,
  useToken,
} from "react-bootstrap-typeahead";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'




const NextNavbar = ({ user, logout, categories, filterByCategory, techs }) => {
  const [current_category, setCurrentCategory] = useState([]);
  const [current_tech, setCurrentTech] = useState([]);

  const filterByCategoryHandler = async (e) => {
    e.preventDefault();
    await filterByCategory(current_category);
  };

  return (
    <>
      <Navbar
        className={`${gst.global__background} ${sty.navbar} ${sty.navbar__upper_navbar}`}
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
        className={`${gst.global__background} ${sty.navbar} ${sty.navbar__lower_navbar}`}
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
            </Nav>

            <Nav className={sty.navbar__lower_navbar__middle_nav}>
              <InputGroup
                size="lg"
                className={`${sty.navbar__cat_input_group} mb-3`}
              >
                <Typeahead
                  id="basic-typeahead-multiple"
                  labelKey="title"
                  onChange={setCurrentCategory}
                  options={categories}
                  placeholder="Search a category..."
                  selected={current_category}
                  clearButton
                />
                <Button
                  onClick={(e) => {
                    filterByCategoryHandler(e);
                  }}
                  className={`${sty.navbar__search_cat_button}`}
                  variant="outline-success"
                >
                 <FontAwesomeIcon size="1x" icon={faCheck}/>
                </Button>
              </InputGroup>
            </Nav>

            <Nav className={sty.navbar__lower_navbar__final_nav}>
              {techs == null ? (
                <></>
              ) : (
                <InputGroup
                  size="lg"
                  className={`${sty.navbar__cat_input_group} mb-3`}
                >
                  <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="title"
                    onChange={setCurrentTech}
                    options={techs}
                    placeholder="Search a tech item..."
                    selected={current_tech}
                    clearButton
                  />
                  <Button
                    className={`${sty.navbar__search_cat_button}`}
                    variant="outline-success"
                  >
                    <FontAwesomeIcon size="1x" icon={faCheck}/>
                  </Button>
                </InputGroup>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NextNavbar;
