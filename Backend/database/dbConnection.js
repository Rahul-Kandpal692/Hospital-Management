import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGMENT_SYSTEM"
    }).then(()=>{
        console.log("DB Connected");
    }).catch(err=>{
        console.log(`Could not connect to DB: ${err}`)
    })
} 