import '../styles/globals.css'
import { AuthProvider, getUser } from "../context/AuthContext"
import App from "next/app"

function MyApp({ Component, pageProps }) {
 return( <AuthProvider>
     <Component {...pageProps} />
  </AuthProvider>);
}


// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const auth = await getUser(appContext.ctx);
//   return { ...appProps, auth: auth}
// }



export default MyApp
