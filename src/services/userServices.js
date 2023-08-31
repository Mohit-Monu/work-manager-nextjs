import { httpAxios } from "@/helper/httpHelper"

export async function addUser(user){
    try{
        const res=await httpAxios.post("/api/users",user)
        return res.data
    }catch(err){
        throw new Error(err.response.data.message)
    }
}
export async function loginUser(user){
    try{
        const res=await httpAxios.post("/api/login",user)
        return res.data
    }catch(err){
        throw new Error(err.response.data.message)
    } 
}
export async function currentUser(){
    try{
        const res=await httpAxios.get("/api/current")
        return res.data
    }catch(err){
        throw new Error(err.response.data.message)
    }
}
export async function logoutUser(){
    try{
        const res=await httpAxios.post("/api/logout")
        return res.data
    }catch(err){
        throw new Error(err.response.data.message)
    }
}