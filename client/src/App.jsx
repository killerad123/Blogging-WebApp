
import Comment from "./components/Comment"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import Homepage from "./components/Homepage"

const routerForApp = createBrowserRouter(
  [
    {
      path:'/',
      element:<><Navbar/> <Homepage /></>,
    },
    {
      path: "/login",
      element:<><Navbar/> <Login /></>,
    },
    {
      path: "/user/profile",
      element:<><Navbar/><Profile/></>,
    },
    {
      path: "/blog/explore/:id",
      element:<><Navbar/> <Comment /></>,
    },
    
  ]
);

function App() {
  
  return (
    <div className="w-screen text-white overflow-x-hidden bg-slate-800 h-screen">
      <RouterProvider router={routerForApp} />
      {/* <Homepage/> */}
      {/* <Comment/> */}
      {/* <Profile/> */}
    </div>
  )
}

export default App
