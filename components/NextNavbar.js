import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, createRef } from "react";
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
  InputGroup,
} from "react-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  Typeahead,
  Token,
  Highlighter,
  useToken,
} from "react-bootstrap-typeahead";

const NextNavbar = ({ user, logout, categories }) => {
  const [current_category, setCurrentCategory] = useState([]);
  const ref = createRef();

  const currentCategoryHandler = async (e) => {
    e.preventDefault();
    console.log(category_options[1]);
    setCurrentCategory(category_options[1]);
  };

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
                  className={`${sty.navbar__search_cat_button}`}
                  variant="outline-success"
                >
                  {"->"}
                </Button>
              </InputGroup>
            </Nav>

            {/* <Nav>
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
            </Nav> */}

            <Nav className={sty.navbar__lower_navbar__final_nav}>
              <InputGroup
                size="lg"
                className={`${sty.navbar__cat_input_group} mb-3`}
              >
                <Typeahead
                  id="basic-typeahead-multiple"
                  labelKey="title"
                  onChange={setCurrentCategory}
                  options={categories}
                  placeholder="Search a tech item..."
                  selected={current_category}
                  clearButton
                />
                <Button
                  className={`${sty.navbar__search_cat_button}`}
                  variant="outline-success"
                >
                  {"->"}
                </Button>
              </InputGroup>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NextNavbar;
