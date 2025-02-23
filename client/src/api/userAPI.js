import { getAPI, postAPI } from "./methods"


export const loginAPI = async(val)=>{
    const res = await postAPI("","/api/v1/auth/login",val)
    return res
}


export const registerAPI = async(val)=>{
    const res = await postAPI("","/api/v1/auth/signup",val)
    return res
}


export const userDetailsAPI = async(token)=>{
    const res = await getAPI(token,"/api/v1/auth/details")
    return res
}