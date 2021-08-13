import axios from "axios";
import router from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import sty from "../styles/ReviewsComponent.module.css";
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
  Card,
} from "react-bootstrap";

import { useAuth } from "../context/AuthContext";

const ReviewsComponent = ({ tech, reviews }) => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const [revNumber] = useState(3);
  const [paginatedRevs, setPaginatedRevs] = useState([]);

  useEffect(async () => {
    const currentPageNumber = pageNumber * revNumber - revNumber;
    const temp_reviews = [...reviews];
    setPaginatedRevs(temp_reviews.slice(currentPageNumber, revNumber));
  }, []);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    const currentPageNumber = newPageNumber * revNumber - revNumber;
    const temp_reviews = [...reviews];
    setPaginatedRevs(temp_reviews.slice(currentPageNumber, revNumber));
  };
  const handleNext = () => {
    const newPageNumber = pageNumber + 1;
    if (newPageNumber * revNumber > reviews.length) {
      if (pageNumber * revNumber < reviews.length) {
        setPageNumber(newPageNumber);
        const currentPageNumber = newPageNumber * revNumber - revNumber;
        const temp_reviews = [...reviews];
        setPaginatedRevs(temp_reviews.slice(currentPageNumber, reviews.length));

        console.log(reviews.length - pageNumber * revNumber);
      }
      return;
    }
    setPageNumber(newPageNumber);
    const currentPageNumber = newPageNumber * revNumber - revNumber;
    const temp_reviews = [...reviews];
    setPaginatedRevs(
      temp_reviews.slice(currentPageNumber, newPageNumber * revNumber)
    );
  };

  return tech == null || reviews == null ? (
    <>No reviews</>
  ) : (
    <Container className={sty.tech__div}>
      {paginatedRevs.map((rev, index) => {
        return (
          <Card key={index} className={sty.rev__card}>
            <Card.Header className={sty.rev__card_header}>
              {rev.title}
            </Card.Header>
            <Card.Body className={sty.rev__card_body}>
              {rev.description}
            </Card.Body>
            <Card.Footer className={sty.rev__card_footer}>
              {rev.score} out of 5.0
              <span className={sty.rev__star_span}>★</span> by{" "}
              <span className={sty.rev__user_span}>{rev.username}</span>
            </Card.Footer>
          </Card>
        );
      })}

      <div>
        <button onClick={() => handlePrev()}>prev</button>
        <button onClick={() => handleNext()}>next</button>
      </div>
    </Container>
  );
};
export default ReviewsComponent;
