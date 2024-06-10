const express = require('express');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const env = require("dotenv")
const router = express.Router();
const userModel = require("../models/user");
const checkUserAuthentication = require('../middlewares/authentication');
env.config()

router.get("/", (req, res) => {
    res.render("login")
})

router.get("/logout",checkUserAuthentication, (req, res)=>{
    res.clearCookie("token")  
    // res.redirect("/user")

    res.json({success:true})
})
router.get("/profile", checkUserAuthentication, async (req, res) => {
    // console.log(req.user)
    const user = await userModel.findOne({ email: req.user.email }).populate("blogs")
    // console.log(user.blogs)
    // res.render("profile", { user })
    res.json({user:user,success:true,msg:"OK"})
})

// router.get("/profile",async function(req, res) {
//     const blogs = await blogModel.find()
//   // res.render("home",{blogs});
//   res.json({blogs: blogs,msg:"ok"});
// // res.json({msg:"ok"})    
// })
router.post("/register", async (req, res) => {
    // console.log(req.body)
    let { username, email, password } = req.body
    // checking if the user is already registered or not
    const user = await userModel.findOne({ email })
    if (user) {
    
        // res.redirect("/user/profile")
        res.json({msg:"Already registered"})
    }
    else {

        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                const data = await new userModel({
                    username,
                    email,
                    password: hashedPassword
                })
                data.save()
                const token = jwt.sign({ email: email, userId: data._id }, process.env.SECRET_KEY)
                // res.cookie("token", token).redirect("/user/profile")
                res.cookie("token", token,{ httpOnly: true, secure: false, sameSite: 'Lax' }).json({msg:"Created user",success: true})
            })
        })
    }
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        // return res.redirect("/user")
        res.json({msg:"User not found",success:false})
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: email, userId: user._id }, process.env.SECRET_KEY)
                res.cookie("token", token)
                // res.redirect("/user/profile")
                res.json({msg:"Logged in",success:true})
            } else {
                // res.redirect("/user")
                res.json({msg:"Not logged in",seccess:false})
            }
        })
    }
})


module.exports = router
