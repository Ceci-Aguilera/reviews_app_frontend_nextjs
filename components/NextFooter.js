import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, createRef } from "react";
import gst from "../styles/NextGlobal.module.css";
import sty from "../styles/NextFooter.module.css";
import { Container } from "react-bootstrap";

const NextFooter = () => {
  return (
    <>
      <footer className={`${gst.global__background} ${sty.footer}`}>
        <Container className={sty.footer__div}>
          <p className={sty.footer__p}>
            Design & Developed by Cecilia Aguilera
          </p>
        </Container>
      </footer>
    </>
  );
};

export default NextFooter;
