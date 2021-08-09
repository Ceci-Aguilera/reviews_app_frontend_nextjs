import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { auth, user, loading } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {user == null ? <p>Null</p> : <p>{user.username}</p>}
            <Link href="/login">
              <a style={{ color: "blue" }}>Login</a>
            </Link>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>This is the footer</p>
      </footer>
    </div>
  );
}
