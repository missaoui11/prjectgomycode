const express = require("express")
const User =require("../model/login")
const router = express.Router()
const bcrypt =require('bcrypt')
const jwt =require("jsonwebtoken")
const { isAuth } = require("../midllewar/isAuth")

router.post("/register",async(req,res)=>{
    data =req.body;
    usr=new User(data)
    salt =bcrypt.genSaltSync(10);
    cryptedpass = await bcrypt.hashSync(data.password,salt)
    usr.password =cryptedpass;
    usr.save()
    .then(
        (saved)=>{
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})

router.post("/login", async (req, res) => {
    data = req.body;
    user = await User.findOne({ email: data.email })
    if (!user) {
        res.status(404).send("Email or password invalid!")
    } else {
        validpass = bcrypt.compareSync(data.password, user.password)
        if (!validpass) {
            res.status(401).send("Email or password invalid!")
        } else {
            payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign(payload, "1234567")
            res.status(200).send({token: token,user })
        }
    }
})

router.get('/get',isAuth,async(req,res)=>{
    try {
        const user = await User.findById(req.user);
        res.json(user);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("server error");
      } 
 })








module.exports = router 