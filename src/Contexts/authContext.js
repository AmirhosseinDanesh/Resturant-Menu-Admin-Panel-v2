import { createContext } from "react"

const authContext = createContext({
    isLoggedIn : false,
    token : null,
    userInfo : null,
    login: ()=>{},
    logout: ()=>{},
})


export default authContext