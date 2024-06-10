
export default function Blog(props) {
  
 
  return (
    <div className="w-fit inline-block p-2 h-fit border-2 border-slate-400">
        <h3 className="text-lg">{props.blogData.title}</h3>
        <p className="mt-2 text-lg">{props.blogData.desc}</p>
        <div className="flex gap-2 mt-4 justify-between">
            <span>{props.blogData.likes.length} likes</span>
            <span>
                 <button onClick={props.handleDeleteBlog} className="mr-4 text-red-400 hover:text-red-500  px-3 py-1 rounded-xl ">Delete</button>
            </span>
        </div>
    </div>
  )
}

