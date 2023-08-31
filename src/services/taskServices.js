import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task){
    try{
        const res=await httpAxios.post("/api/tasks",task)
        return res.data
    }catch(err){
        throw new Error(err)
    }
}
export async function getAllTask(userid){
    try{
        const res=await httpAxios.get(`/api/users/${userid}/tasks`)
        return res.data
    }catch(err){
        throw new Error(err)
    }
} 
export async function deleteTask(taskId){
    try{
        const res=await httpAxios.delete("/api/tasks/"+taskId,taskId)
        return res.data
    }catch(err){
        throw new Error(err)
    }
}