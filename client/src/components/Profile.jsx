import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

export default function Profile() {
  console.log("profilr")
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const [createBlogData,setcreateBlogData] = useState({
    title:"",
    desc:"",	
  });
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/profile", {
        withCredentials: true,
      });
      if (response.data.success) {
        setProfileData(response.data); // Set data only if message is "ok"
      } else {
        navigate("/"); // Redirect to home if message is not "ok"
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle errors gracefully, e.g., display an error message
    }
  };

  useEffect(() => { 
    getProfile();
  }, []);
  if (!profileData) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    ); // Prevent rendering while data is being fetched or error occurs
  }
  const { username, blogs } = profileData.user; // Assuming data structure  

  function changeHandler(e) {
    setcreateBlogData({
      ...createBlogData,
      [e.target.name]: e.target.value
  })
  }

 async function createNewBlog(e) {
  e.preventDefault()
    const res = await axios.post("http://localhost:3000/blog/create",createBlogData,{withCredentials:true})
    if(res.data.success){
      // navigate("/user/profile",{replace:true})
      getProfile()
      setcreateBlogData({
        title:"",
        desc:"",
      })

    }
    
  }

  async function deleteBlog(_id) {
    
      const deletedBlog = await axios.get(`http://localhost:3000/blog/delete/${_id}`,{withCredentials: true})
      if(deletedBlog){
        getProfile()
      }
      else{
        console.log("error")
      }
     
    }
  
  async function handleLogout() {
    const res  = await axios.get("http://localhost:3000/user/logout",{withCredentials:true})
    if(res.data.success){
      navigate("/")
  }
}

  return (
    <div className="w-full relative h-full px-2">
      <div className="profileInfo my-4 px-4 relative">
        <div className="w-full flex justify-between">
        <p className="text-4xl">Hi, {username} </p>
        <span onClick={handleLogout} className="bg-red-400 cursor-pointer px-4 py-2 rounded-md">Logout</span>
        </div>
        
      </div>
      <div>
        <div className="px-4">
            <h2 >Create Post here</h2>
          <form onSubmit={createNewBlog} className="mt-3 " method="post">
            <label htmlFor="title">Title</label>
            <input onChange={changeHandler} value={createBlogData.title} className="block w-full bg-transparent border-2 px-2 font-[cursive] font-semibold border-slate-500 rounded-md h-10" type="text" placeholder="Title Here...." name="title" id="title" />
            <label htmlFor="desc">Description</label>
            <textarea  onChange={changeHandler} value={createBlogData.desc} className="block resize-none w-full bg-transparent border-2 px-2 font-[cursive] font-semibold border-slate-500 rounded-md" name="desc" placeholder="Post Description Here..." id="desc" cols="30" rows="5"></textarea>
            <input type="submit" value="Create Post" className="bg-blue-600 px-3 mt-2 rounded-md py-2" />
          </form>
        </div>
      </div>
      <h2 className="mb-3 mt-4 px-4">Your Posted Blogs</h2>
      {blogs.length === 0 ? (
        <h2 className="px-4">No Blogs</h2>
      ) : (
        <div className="blogs px-3 mt-8 flex justify-between gap-1 flex-wrap">
          {blogs.map((blog) => (
            <Blog key={blog._id} blogData={blog} handleDeleteBlog={() => deleteBlog(blog._id)} /> // Assuming blog data structure
          ))}
        </div>
      )}
    </div>
  );
}


{
  /* <div className="w-full bg-slate-900 absolute h-full flex justify-center items-center">
<ProfileEdit/>
</div> */
}
