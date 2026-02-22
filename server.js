const app=require("./src/app");


require("dotenv").config();
const port=process.env.port||5000;



const connectDB=require("./src/config/db");


connectDB();

app.listen(port,(req,res)=>{
    console.log('server started');
})