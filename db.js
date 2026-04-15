const mongoose=require('mongoose');


const connectDB=async()=>{
    try {
        await mongoose.connect('DB_URL');
        console.log('mongo connected');
    } catch (error) {
        console.log("error occur",error);
    }

}
module.exports=connectDB;
