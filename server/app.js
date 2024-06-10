const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes");
const blogModel = require("./models/blog")
const connection = require("./utilities/connection")
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
connection()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's origin
  credentials: true
}))

app.get('/', async (req, res) => {
  const blogs = await blogModel.find().populate("user")
  // res.render("home",{blogs});
  res.json({msg:"success", blogs: blogs });
});

app.use("/user", userRoutes)
app.use("/blog", blogRoutes)



app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
