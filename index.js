const express = require("express")
const app = express()
const port = 3000

const studentRouter = require("./Routes/Students")
const userRouter = require("./Routes/Users")

try{
    app.use(express.json());
    app.use('/student',studentRouter)
    app.use('/user',userRouter)
}catch (error){
    console.log("error occured")
}



app.listen(port,()=>{
    console.log("listening to port 3000")
})