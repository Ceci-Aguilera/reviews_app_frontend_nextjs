import axios from "axios";
import router from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import sty from "../styles/TechDetailComponent.module.css";
import gst from "../styles/NextGlobal.module.css";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";

import ReactStars from "react-rating-stars-component";

const TechDetailComponent = ({ tech }) => {
  const [score, setScore] = useState(0);

  const scoreHandler = async (newRating) => {
    setScore(newRating);
  };

  return tech == null ? (
    <></>
  ) : (
    <Container className={sty.tech__div}>
      <Row className={sty.tech__row}>
        <Col xs={12} sm={12} md={6} md={6} className={sty.tech__img_col}>
          <div className={sty.tech__img_div}>
            <img src={tech.image_url} className={sty.tech__image} />
          </div>
          <div className={sty.tech__star_div}>
            <h1
              style={{
                background: `linear-gradient(90deg, #fc0 ${ScoreCalc(
                  tech
                )}%, #333 ${ScoreCalc(tech)}%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontSize: "50px",
                fontFamily: "Times",
                lineHeight: "1",
              }}
              aria-label={`Rating of this product is ${tech.score} out of 5.`}
            >
              ★★★★★
            </h1>
            <p className={sty.tech__star_info_1}>From {tech.amount} reviews.</p>

            <p className={sty.tech__star_info_2}>
              Scored {tech.score} of 5.0★.
            </p>
          </div>

          <div className={sty.tech__reviews_button_div}>
            <Button variant="primary" className={sty.tech__reviews_button}>
              See reviews
            </Button>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} md={6} className={sty.tech__form_col}>
          <div className={sty.tech__rev_header_div}>
            <h1 className={sty.tech__rev_header}>{tech.title}</h1>
          </div>

          <div className={sty.tech__rev_comment}>
            <Form className={sty.tech__form}>
              <InputGroup
                className={`${sty.tech__rev_input_group} ${sty.tech__rev_title}`}
              >
                {/* <Form.Label>Title</Form.Label> */}
                <FormControl type="text" placeholder="Title of the review" />
              </InputGroup>

              <InputGroup
                className={`${sty.tech__rev_input_group} ${sty.tech__rev_description}`}
              >
                {/* <Form.Label>Description</Form.Label> */}
                <FormControl as="textarea" placeholder="Review & comments" />
              </InputGroup>


              <p className={sty.tech__rev_info_1}>
                Rating
              </p>
              <InputGroup
                className={`${sty.tech__rev_input_group} ${sty.tech__rev_score}`}
              >
                {/* <Form.Label>Score</Form.Label> */}
                <ReactStars
                  className={sty.tech__stars_component}
                  count={5}
                  onChange={scoreHandler}
                  size={50}
                  activeColor="#ffd700"
                />
              </InputGroup>

              <p className={sty.tech__rev_info_2}>
                Out of 5★.
              </p>

              <Container className={sty.tech__send_rev_button_div}>
                <Button
                  variant="success"
                  className={sty.tech__send_rev_button}
                  onClick={() => {
                    console.log("Send review");
                  }}
                >
                  Send review
                </Button>
              </Container>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const ScoreCalc = (tech) => {
  if (tech.score) {
    return String(tech.score * 20);
  } else return "0";
};

export default TechDetailComponent;
