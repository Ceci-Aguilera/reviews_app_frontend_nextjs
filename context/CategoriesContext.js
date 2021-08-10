import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, useContext } from "react";

const CategoriesContext = createContext();

export const getCategories = async () => {
  const categories_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/categories";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .get(categories_url, config)
    .then(async (response) => {
      if (response.data) {
        const res = await response.data.data['categories'];
        return { status: "CATEGORIES_FETCHED", categories: res };
      } else {
        console.log("no categories");
        return { status: "NO_CATEGORIES", categories: null };
      }
    })
    .catch((err) => {
      console.log("no categories");
      return { status: "NO_CATEGORIES", categories: null };
    });
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(async () => {
    const temp_res = await getCategories();
    setCategories(temp_res['categories']);
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories: categories}}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
export const CategoriesConsumer = CategoriesContext.Consumer;
