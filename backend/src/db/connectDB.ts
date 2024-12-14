import mongoose from "mongoose"



export const ConnectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`connected to ${connect.connection.host}`);
        
    } catch (error:any) {
        throw new Error(error.message as string)
    }
}