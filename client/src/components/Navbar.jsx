import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between h-26 px-4 py-2 bg-zinc-800 text-white font-[cursive]">
        <Link to={'/'} className="text-3xl cursor-pointer"> JustBlog</Link>
        <div className="flex gap-4">
        <Link to={"/user/profile"}>Profile</Link>
        <Link to={'/login'} href="" className="bg-slate-600 font-medium hover:bg-slate-500 rounded-2xl py-[2px] px-9 mr-10 text-xl">Login</Link>
        </div>
    </div>
  )
}
