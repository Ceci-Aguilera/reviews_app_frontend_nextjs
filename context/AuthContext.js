import axios from 'axios';
import { createContext } from 'react';
import router from 'next/router';

const AuthContext = createContext();

export const getUser = async(ctx) => {

    const user_email = windows.local.getItem("user_email");
    const user_token = windows.local.getItem("user_token");

    const params = {
        user_email,
        user_token
    }

    const login_url = process.env.NEXT_PUBLIC_API_DOMAIN + "api/v1/check_auth"

    if(user_email && user_token){
        return await axios.get(
            auth_url,
            { params }
        ).then((response) => {
            if(response.data){
                return { status: 'SIGNED_IN', user: response.data };
            }
            else{
                return { status: 'SIGNED_OUT', user: null}
            }
        })
    }
    else{
        return { status: 'SIGNED_OUT', user: null}
    }

}


export const AuthProvider = (props) => {
    const auth = props.myAuth || {status: 'SIGNED_OUT', user: null};
  
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
                'Content-Type': 'application/Json'
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
                'Content-Type': 'application/Json'
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

    return <AuthContext.Provider value={{auth, logout, register, login }} {... props} />;
};

export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;