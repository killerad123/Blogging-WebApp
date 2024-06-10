import axios from "axios"
import {useState} from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const[toggelTab,settoggleTab] = useState(true)
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",

    })
    const [loginFormData, setloginFormData] = useState({
        username:"",
        email:"",
    })
    const register = () => {
        settoggleTab(true)
        console.log("button register ",toggelTab)
    }
    const login = () => {
        settoggleTab(false)
        console.log("button login ",toggelTab)
    }
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    }
    const handleLoginChange = (e) => {
    setloginFormData({
        ...loginFormData,
        [e.target.name]: e.target.value
    })
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post("http://localhost:3000/user/register", formData,{withCredentials:true});
            console.log('Form data submitted successfully:', response);
            
            if(response.data.msg==="Created user"){
                // document.cookie()
                navigate("/")
            }
        
            // Handle successful response here, e.g., display a success message, redirect to another page
          } catch (error) {
            console.error('Error submitting form:', error);
        
            // Handle errors here, e.g., display an error message to the user
          }
    // Access and process form data from formData state
    const { username, email, password } = formData;
    console.log("Submitted form data:", username, email, password);
    }
    const handleLogin = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post("http://localhost:3000/user/login", loginFormData,{withCredentials:true});
            console.log('Form data submitted successfully:', response);
            
            if(response.data.success){
                // document.cookie()
                navigate("/user/profile")
            }
        
            // Handle successful response here, e.g., display a success message, redirect to another page
          } catch (error) {
            console.error('Error submitting form:', error);

            // Handle errors here, e.g., display an error message to the user
          }
    }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-fit p-4 h-fit border-2 border-slate-500 rounded-md">
            <div className="btns flex justify-between gap-2 bg">
                <button onClick={register} className="w-1/2 py-2 px-4 hover:bg-blue-700 rounded-md bg-blue-600 text-white font-serif">Register</button>
                <button onClick={login} className="w-1/2 py-2 px-4 hover:bg-blue-700 rounded-md bg-blue-600 text-white font-serif">Login</button>
            </div>
            {toggelTab && 
            <form className="mt-10 min-h-fit flex flex-col" onSubmit={handleSubmit}>
                <label className="font-bold font-mono" htmlFor="username"> Username </label>
                <input onChange={handleChange} placeholder="username" name="username" type="text" className="text-black h-9 block w-[300px] outline-none border-2 mb-5 border-gray-400 py-2 font-semibold px-2 rounded-lg" id="username" />
                
                <label className="font-bold font-mono" htmlFor="email"> Email </label>
                <input onChange={handleChange} type="email" placeholder="Email" name="email" className="text-black h-9 block border-2 outline-none w-[300px] mb-5 border-gray-400 py-2 font-semibold px-2 rounded-lg" id="email" />
                
                <label className="font-bold font-mono" htmlFor="pass"> Password </label>
                <input onChange={handleChange} name="password" type="Password" placeholder="****" className="text-black h-9 block border-2 outline-none border-gray-400 mb-5 rounded-lg w-[300px] py-2 font-semibold px-2" id="pass" />
                
                <input type="submit" value="Register Now" className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl" name="" id="" />
            </form> 
            }
            {!toggelTab && 
            <form className="mt-10 min-h-fit flex flex-col" onSubmit={handleLogin}>     
                <label className="font-bold font-mono" htmlFor="email"> Email </label>
                <input onChange={handleLoginChange} type="email" placeholder="Email" name="email" className="h-9 outline-none text-black block border-2 w-[300px] mb-5 border-gray-400 py-2 rounded-lg font-semibold px-2" id="email" />
                
                <label className="font-bold font-mono" htmlFor="pass"> Password </label>
                <input onChange={handleLoginChange} type="Password" placeholder="****" name="password" className="h-9 outline-none text-black block border-2 border-gray-400 mb-5 rounded-lg w-[300px] py-2 font-semibold px-2" id="pass" />
                
                <input type="submit" value="Login Now" className="px-5 py-3 mt-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl" name="" id="" />
            </form>
            }
        </div>
    </div>
  )
}
