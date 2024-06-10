
export default function ProfileEdit() {
  return (
    <div className="py-3 h-[400px] bg-slate-800 w-[450px] px-4 border-2 border-white rounded-xl">
        <form action="" className="mt-4">
            <label htmlFor="about" className="text-lg">About Me</label>
            <textarea type="text" className="block py-2 resize-none rounded-md mt-2 bg-transparent border-2 w-full border-slate-600 px-2" rows="5" name="" id="about" />
        </form>
        <div className="flex flex-col justify-center items-center">
        <h3 className="mt-10">Username</h3>
        <p className="">@gmail.com</p>
        <button type="button" className="bg-blue-700 mt-8 hover:bg-blue-800 px-2 py-3 rounded-xl">Save Changes</button>
        </div>
    </div>
  )
}
