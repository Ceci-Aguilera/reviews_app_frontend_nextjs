import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { auth, user, loading, login, register, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login('someEmail@gmail.com', 'SuperHellow123!');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    // await logout();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // await register();
  };

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
            {user == null ? <p>Null</p> : <p>Not Null</p>}
            <button
              onClick={(e) => {
                handleRegister(e);
              }}
              type="submit"
            >
              Register
            </button>
            <button
              onClick={(e) => {
                handleLogin(e);
              }}
              type="submit"
            >
              Login
            </button>
            <button
              onClick={(e) => {
                handleLogout(e);
              }}
              type="submit"
            >
              Logout
            </button>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>This is the footer</p>
      </footer>
    </div>
  );
}
