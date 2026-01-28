const express=require('express');
const app=express();
const connectDB=require('./db');
const userRoutes=require('./routes/user');
const cors=require('cors');

app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);

connectDB();

app.listen(3000,()=>{
    console.log('server started at port 3000');
})