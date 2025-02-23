import { getAPI, patchAPI, postAPI } from "./methods"




export const createPost =async(token,data)=>{
    const res = await postAPI(token,"/api/v1/post",data)
    return res
}


export const getAllPosts = async()=>{
    const res = await getAPI("",`/api/v1/post`)
    return res
}



export const getSinglePost = async()=>{
    const res = await getAPI("",`/api/v1/post/${id}`)
    return res
} 


export const getUserPost = async(token)=>{
    const res = await getAPI(token,`/api/v1/post/user/all`)
    return res
} 



export const likePost = async(token,id)=>{
    const res = await patchAPI(token,`/api/v1/post/${id}/like`,{})
    return res
} 


export const unlikePost = async(token,id)=>{
    const res = await patchAPI(token,`/api/v1/post/${id}/unlike`,{})
    return res
} 
