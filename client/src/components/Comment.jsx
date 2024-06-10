import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Comment() {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    desc: "",
    likes: [],
    isUserLiked: false,
    comments: [],
  });
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const[userlike,setuserlike] = useState("")
  async function getSelectedBlog() {
    const res = await axios.get(`http://localhost:3000/blog/explore/${id}`, {
      withCredentials: true,
    });
    const data = res.data;
    setBlogDetails({
      ...blogDetails,
      title: data.blog.title,
      desc: data.blog.desc,
      likes: data.blog.likes,
      isUserLiked: data.isUserLiked,
      comments: data.comments,
    });
  }

  async function handleLike() {
    const res = await axios.get(`http://localhost:3000/blog/like/${id}`, {
      withCredentials: true,
    });
    console.log(res);
    if(res.msg==="Yes"){
      setuserlike("Yes")
      getSelectedBlog();
    }
    else{
      setuserlike("No")
      getSelectedBlog();
    }
  }

  async function postComment(e) {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3000/blog/comment/${id}`,
      { content: newComment },
      { withCredentials: true }
    );
    console.log(res);
    if (res.data.success) {
      setNewComment("");
      getSelectedBlog();
    } else {
      console.log("error");
    }
  }

  useEffect(() => {
    getSelectedBlog();
  }, []);

  return (
    <div className="w-full font-[cursive] h-full px-2 py-4 text-white">
      <div className="blogBody text-lg font-[cursive] h-fit py-4 px-2 flex flex-col gap-2 w-full text-white border-[3px] rounded-md border-slate-500">
        <a href="" className="text-3xl">
          {blogDetails.title}
        </a>
        <p className="text-2xl">{blogDetails.desc}</p>
        <div className="flex mt-4 justify-between items-center">
          <span className="text-xl mt-6">{blogDetails.likes.length} Likes</span>
          <span
            onClick={handleLike}
            className="px-4 text-md py-1 text-white cursor-pointer hover:bg-blue-800 font-bold bg-blue-400 rounded-xl"
          >
            {blogDetails.isUserLiked==="Yes" ? "Unlike" : "Like"} Post
          </span>
        </div>
      </div>

      <form
        onSubmit={postComment}
        className="flex w-full justify-between items-center"
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mt-2 w-[90%] rounded-md bg-transparent resize-none border-2 text-xl font-[cursive] p-2 border-slate-600"
          placeholder="Your Views...."
          cols="30"
          rows="3"
          name="content"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-700 h-12 rounded-3xl py-2 px-3 mr-4"
        >
          Post Comment
        </button>
      </form>
      <h3 className="text-2xl my-4">Comments</h3>

      <div className="comments h-fit mt-2 w-full">
        {blogDetails.comments.map((comment) => (
          <div
            key={comment._id}
            className="border-2 px-2 rounded-md border-slate-600 flex flex-col gap-4 py-2"
          >
            <p>{comment.commentBy.username}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
