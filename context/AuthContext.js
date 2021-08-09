import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, useContext } from "react";

const AuthContext = createContext();

export const getUser = async () => {
  const user_email = window.localStorage.getItem("user_email");
  const user_token = window.localStorage.getItem("user_token");

  const auth_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/check_auth";

  if (user_email !== "undefined" && user_token !== "undefined") {
    const params = {
      user_email,
      user_token,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await axios
      .get(auth_url, { params }, config)
      .then(async (response) => {
        if (response.data) {
          console.log("user");
          const res = await response.data.data["user"][0];
          return { status: "SIGNED_IN", user: res };
        } else {
          console.log("no user");
          return { status: "SIGNED_OUT", user: null };
        }
      })
      .catch((err) => {
        console.log("no user");
        return { status: "SIGNED_OUT", user: null };
      });
  } else {
    console.log("no user saved");
    return { status: "SIGNED_OUT", user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const temp_auth = await getUser();
    setAuth(temp_auth);
    setUser(temp_auth["user"]);
  }, []);

  const login = async (email, password) => {
    const body = JSON.stringify({
      sign_in: {
        email,
        password,
      },
    });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const login_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/sign_in";

    return await axios
      .post(login_url, body, config)
      .then(async (response) => {
        const res = await response.data.data;
        const temp_user = res["user"];

        setUser(temp_user);
        window.localStorage.setItem("user_email", temp_user.email);
        window.localStorage.setItem(
          "user_token",
          temp_user.authentication_token
        );

        setLoading(false);
        router.push("/");
        console.log("user signed in");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        // console.log("incorrect email or password entered");
      });
  };

  const register = async (email, password, re_password, username) => {
    if (password != re_password) {
      console.log("passwords do not match");
    }

    const body = JSON.stringify({
      user: {
        email,
        password,
        username,
      },
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const register_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/sign_up";

    return await axios
      .post(register_url, body, config)
      .then(async (response) => {
        const res = await response.data.data;
        const temp_user = res["user"];

        setUser(temp_user);
        window.localStorage.setItem("user_email", temp_user.email);
        window.localStorage.setItem(
          "user_token",
          temp_user.authentication_token
        );

        setLoading(false);
        router.push("/");
        console.log("user registered");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, message);
      });
  };

  const logout = async () => {
    const user_email = window.localStorage.getItem("user_email");
    const user_token = window.localStorage.getItem("user_token");

    const params = {
      user_email,
      user_token,
    };

    const logout_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/sign_out";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await axios
      .delete(logout_url, { params }, config)
      .then(() => {
        window.localStorage.removeItem("user_email");
        window.localStorage.removeItem("user_token");
        setUser(null);

        setLoading(false);
        router.push("/");
        console.log("user logged out");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ auth, user, logout, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
