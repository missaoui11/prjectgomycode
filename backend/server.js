const express = require("express");
const app = express();
const connectdb = require("./config/connect");


app.use(express.json());

connectdb();

const userroute=require("./router/user")
app.use('/user',userroute)

app.listen(4000, () => {
  console.log("server work");
});
