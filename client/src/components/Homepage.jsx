// import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Homepage() {
  const [blogs, setblogs] = useState([])
  useEffect(() => {
    const callBlogsAPI = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: 'GET',
          credentials: 'include', // Include cookies with the request
        });
        // console.log(response)

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data.blogs)
        // console.log(data)
        
        setblogs(data.blogs);
      } catch (err) {
        console.log(err);
      }
    };
    
    callBlogsAPI();
    // console.log(document.cookie); // This should now show your cookies, including "token" if set
  }, []);
  
  if(blogs.length === 0) {
    return <h1>Connecting to server...</h1>
  }
  return (
    <div className=" p-2 bg-slate-800 flex flex-wrap w-full h-full">
      {blogs.map((blog) => (
        <div
          key={blog.id} // Assuming each blog has a unique id
          className="blogBody flex flex-col text-lg font-[cursive] h-44 w-1/3 pl-3 text-white border-[3px] rounded-md border-slate-500"
        >
          <span className="text-sm opacity-55">Title</span>
          <Link to={`/blog/explore/${blog._id}`} className="underline mt-0">{blog.title}</Link> {/* Assuming the link would be updated */}
          <span className="text-sm opacity-55 mt-5">Description</span>
          <p className="mt-0">{blog.desc.length >= 165 ? blog.desc.slice(0, 165) + "..." : blog.desc}</p>
          <div>
            <span>{blog.likes.length} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
}
