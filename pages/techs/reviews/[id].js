import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { useAuth } from "../../../context/AuthContext";
import ReviewsComponent from "../../../components/ReviewsComponent";
import SimpleNavbar from "../../../components/SimpleNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getStaticPaths = async () => {
  const all_techs_url =
    process.env.NEXT_PUBLIC_API_DOMAIN + `api/v1/technologies`;

  const res = await axios.get(all_techs_url, config);

  const paths = res.data.data["technologies"].map((tech) => ({
    params: { id: tech.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const tech_id = ctx.params?.id;

  const current_tech_url =
    process.env.NEXT_PUBLIC_API_DOMAIN + `api/v1/technology/${tech_id}`;

  const response = await axios.get(current_tech_url, config);

  return {
    props: {
      tech: response.data.data["technology"],
      reviews: response.data.data["reviews"],
    },
  };
};

export default function ReviewsDetail({ tech, reviews }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(reviews)
  return tech == undefined || reviews === undefined ? (
    <></>
  ) : (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <SimpleNavbar />
          <ReviewsComponent tech={tech} reviews={reviews} />
        </>
      )}
    </>
  );
}
