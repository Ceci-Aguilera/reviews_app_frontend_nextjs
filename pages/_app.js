import "../styles/globals.css";
import { AuthProvider, getUser } from "../context/AuthContext";
import {
  CategoriesProvider,
  getCategories,
} from "../context/CategoriesContext";
import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <Component {...pageProps} />
      </CategoriesProvider>
    </AuthProvider>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const auth = await getUser(appContext.ctx);
//   return { ...appProps, auth: auth}
// }

export default MyApp;
