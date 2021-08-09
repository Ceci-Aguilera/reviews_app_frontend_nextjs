import '../styles/globals.css'
import { AuthProvider, getUser } from "../context/AuthContext"

function MyApp({ Component, pageProps, auth }) {
  <AuthProvider myAuth={auth}>
    return <Component {...pageProps} />
  </AuthProvider>
}


myApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const auth = await getUser(appContext.ctx);
  return { ...appProps, auth: auth}
}



export default MyApp
