import axios from "axios";
import router from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import sty from "../styles/TechsGrid.module.css";
import gst from "../styles/NextGlobal.module.css";
import { Row, Col, Card } from "react-bootstrap";

import React from 'react'

const TechsGrid = ({ techs }) => {


  return techs == null ? (
    <></>
  ) : (
    <div className={`${sty.techs_grid__div}`}>
      <Row className={`${sty.techs_grid__row}`}>
        {techs.map((tech, index) => {
          return (
            <Col
              key={index}
              className={`${sty.techs_grid__col}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Link href={`techs/${tech.id}`}>
                <Card className={`${sty.techs_grid__card}`}>
                  <div
                    className={`${gst.global__border} ${sty.techs_grid__img_div}`}
                  >
                    {" "}
                    <img
                      className={`${sty.techs_grid__image}`}
                      src={tech.image_url}
                      alt={tech.title + " image"}
                    />
                  </div>
                  <Card.Body
                    className={`${gst.global__font} ${sty.techs_grid__card_body}`}
                  >
                    <Card.Title className={`${gst.global__font}`}>
                      {tech.title}
                    </Card.Title>
                    <h1
                      style={{
                        background: `linear-gradient(90deg, #fc0 ${ScoreCalc(
                          tech
                        )}%, #333 ${ScoreCalc(tech)}%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                        fontSize: "40px",
                        fontFamily: "Times",
                        lineHeight: "1",
                      }}
                      aria-label={`Rating of this product is ${tech.score} out of 5.`}
                    >
                      ★★★★★
                    </h1>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
     </div>
  );
};

const ScoreCalc = (tech) => {
  if (tech.score) {
    return String(tech.score * 20);
  } else return "0";
};

export default TechsGrid;
