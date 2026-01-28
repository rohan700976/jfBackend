const mongoose=require('mongoose');


const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://kashyapshivanshu63:acnWBB9v6olumTGL@cluster0.zxu5x.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0');
        console.log('mongo connected');
    } catch (error) {
        console.log("error occur",error);
    }

}
module.exports=connectDB;