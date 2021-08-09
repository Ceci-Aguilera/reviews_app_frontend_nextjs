import axios from 'axios';
import { createContext } from 'react';
import router from 'next/router';
import {useEffect, useState} from 'react';

const AuthContext = createContext();

export const getUser = async() => {

    const user_email = window.localStorage.getItem('user_email');
    const user_token = window.localStorage.getItem('user_token');

    const params = {
        user_email,
        user_token
    }

    const config = {
        headers:{
            "Content-Type": "application/json",
        }
    }

    const auth_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/check_auth"

    if(user_email && user_token){
        return await axios.get(
            auth_url,
            { params },
            config
        ).then((response) => {
            if(response.data){
                console.log(response.data)
                return { status: 'SIGNED_IN', user: response.data };
            }
            else{
                console.log("no user")
                return { status: 'SIGNED_OUT', user: null}
            }
        }).catch((err) => {
            console.log("no user")
                return { status: 'SIGNED_OUT', user: null}
            
        })
    }
    else{
        console.log("no user saved")
        return { status: 'SIGNED_OUT', user: null}
    }

}


export const AuthProvider = ({children}) => {
    // const auth = await getUser() || {status: 'SIGNED_OUT', user: null};
  
    const [auth, setAuth] = useState(null);

    useEffect( async() => {
        const tempAuth = await getUser()
        setAuth(tempAuth);
    }, [])

    const login = async (email, password) => {

        const body = JSON.stringify({
            "sign_in":
            {
                email,
                password,
            }
        })

        const config = {
            headers:{
                "Content-Type": "application/json",
            }
        }

        const login_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/sign_in"
        
        return await axios.post({
            login_url,
            body,
            config
        }).then( () => {
            router.push('/');
            console.log('user signed in');
        })
        .catch(error => {
            console.log("incorrect email or password entered");
        })
    };

    const register = async (email, password, re_password, username) => {

        if(password != re_password){
            console.log("passwords do not match")
        }

        const body = JSON.stringify({
            "user":{
                email,
                password,
                username,
            } 
        })

        const config = {
            headers:{
                "Content-Type": "application/json",
            }
        }

        const login_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/sign_up"

        return await axios.post({
            register_url,
            body,
            config
        }).then((response) => {
            router.push('/')
            console.log("user registered")
        })
        .catch((error) => {
            console.log(error,message)
        })
    };

    const logout = async () => {

        const login_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/logout"
        
        const config = {
            headers:{
                "Content-Type": "application/json",
            }
        }

        return await axios.get({
            logout_url,
            config
        }).then( () => {
            router.push('/');
            console.log('user logged out');
        })
        .catch((error) => {
            console.log(error,message)
        })
    };

    return <AuthContext.Provider value={{auth, logout, register, login }}>
        {children}
         </AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;