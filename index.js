const express = require("express")
const app = express()
const port = 3000

const userRouter = require("./Routes/Users")

app.use(express.json());
app.use('/user',userRouter)

app.listen(port,()=>{
    console.log("listening to port 3000")
})