import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useAuth } from "../../context/AuthContext";
import TechDetailComponent from "../../components/TechDetailComponent";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const url = "http://localhost:3000/api/book";
  const response = await axios.get(current_tech_url, config);

  return {
    props: {
      tech: response.data.data["technology"],
    },
  };
};

export default function TechDetail({ tech }) {
  const { user, loading } = useAuth();

  return tech == undefined ? (
    <></>
  ) : (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
       <TechDetailComponent tech={tech} />
        </>
      )}
    </>
  );
}
