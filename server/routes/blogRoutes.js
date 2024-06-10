const express = require('express');
const router = express.Router();
const userModel = require("../models/user")
const checkUserAuthentication = require("../middlewares/authentication")
const blogModel = require("../models/blog")
const commentModel = require("../models/comment")
const jwt = require("jsonwebtoken")

router.post("/create", checkUserAuthentication, async function (req, res) {
    let { title, desc } = req.body
    const data = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
    let userclient = await userModel.findOne({ _id: `${data.userId}` })
    console.log(data)
    const blog = await new blogModel({
        title: title.trim(),
        desc: desc.trim(),
        user: data.userId
    })
    userclient.blogs.push(blog._id)
    await blog.save()
    await userclient.save()
    // res.redirect("/user/profile")
    res.json({ msg: "blog created successfully", success: true })
})
router.get('/delete/:id', checkUserAuthentication, async function (req, res) {
    console.log(req.params.id)
    // delete route is not checked 
    const user = await userModel.findOne({
        _id: req.user.userId
    })
    let idx = user.blogs.indexOf(req.params.id)
    user.blogs.splice(idx, 1)
    await user.save()
    const deleteBlog = await blogModel.findOneAndDelete({ _id: req.params.id })
    //   console.log(user)
    // res.redirect("/user/profile")
    if (deleteBlog) { 
        res.json({ blog: deleteBlog, success: true }) 
    }
    else {
        res.json({ success: false })
    }
})
router.get("/edit/:id", checkUserAuthentication, async function (req, res) {

    const blogDetails = await blogModel.findOne({ _id: req.params.id })
    // res.render("edit", { blogDetails })
    res.json({ blogDetails: blogDetails,success: true })
})
router.post("/edit/:id", checkUserAuthentication, async function (req, res) {
    let { title, desc } = req.body
    const updatedBlog = await blogModel.findOneAndUpdate({ _id: req.params.id }, { title: title.trim(), desc: desc.trim() }, { new: true })
    // console.log(updatedBlog)
    // res.redirect("/user/profile")
    res.json({ msg: "blog updated successfully", success: true })
})
router.get("/explore/:id", checkUserAuthentication, async (req, res) => {
    const blog = await blogModel.findOne({ _id: req.params.id })
        .populate({
            path: 'comments',
            populate: {
                path: 'commentBy',
                model: 'user'
            }
        });
    const comments = blog.comments
    // console.log(comments)

    let isUserLiked = (blog.likes.indexOf(req.user.userId) === -1) ? "No" : "Yes"
    // res.render("showBlog", { blog, isUserLiked, comments })
    res.json({ blog: blog, isUserLiked: isUserLiked, comments: comments, success: true })
})

router.get("/like/:id", checkUserAuthentication, async (req, res) => {
    let currblog = await blogModel.findOne({ _id: req.params.id })
    let currUserId = req.user.userId
    if (currblog.likes.indexOf(currUserId) === -1) {
        currblog.likes.push(req.user.userId)
        currblog.save()
        res.json({success: true,msg:"Liked"})
    }
    else {
        currblog.likes.splice(currblog.likes.indexOf(currUserId), 1)
        currblog.save()
        res.json({ success: true,msg:"Unliked" })
    }
    // res.redirect("/")

})

router.post("/comment/:id", checkUserAuthentication, async (req, res) => {
    let currblog = await blogModel.findOne({ _id: req.params.id })
    let currUserId = req.user.userId
    const comment = await new commentModel({
        text: req.body.content,
        commentBy: currUserId
    })
    currblog.comments.push(comment._id)
    comment.save()
    currblog.save()
    // res.redirect(`/blog/explore/${req.params.id}`)
    res.json({ success: true,msg:"comment added" })
})

module.exports = router;
