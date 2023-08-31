import mongoose from "mongoose";

const config={
    isConnected:0
}
export const connectDb = async()=>{
    if(config.isConnected){
        return
    }
    try{
        const {connection}=await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName:"work_manager",
        })
        config.isConnected=connection.readyState

        console.log("Connect with DB")
    }catch(err){
        console.log(err)
    }
}