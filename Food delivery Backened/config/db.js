import mongoose from "mongoose";

 export const connectDB=async()=>{
    await mongoose.connect(`mongodb+srv://sudipp689:786403@cluster0.ndcnkn0.mongodb.net/food-del`)
    .then(()=>console.log("DB Connected"));
}