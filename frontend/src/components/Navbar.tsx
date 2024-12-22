import { Link } from "react-router-dom"
import Bar from "../assets/Bar"
import { useState } from "react"


const Navbar = () => {
    const [open, setOpen] = useState(false)    

    function handleClick () {
        setOpen(!open)
        console.log(open);
    }

  return (
    <div className="fixed z-50 top-0 bg-white h-20 min-w-full border-b-2 flex items-center justify-between">
        <a className="text-xl text-blue-600 font-bold uppercase mx-2" href="/">Jobs.<span className="text-orange-500">me</span></a>
        <div className="hidden md:flex justify-between items-center gap-4">
            <Link to={{pathname:"/"}} className=" text-gray-500 hover:text-black">Home</Link>
            <Link to={{pathname:"/companies"}} className=" text-gray-500 hover:text-black">Companies</Link>
            <Link to={{pathname: "/jobs" }}className=" text-gray-500 hover:text-black">Jobs</Link>
            
        </div>
        <div className="flex gap-4 mx-2">
            <div className="flex gap-4">
                <Link className="border px-4 py-2 rounded-full border-blue-600 text-blue-600 font-semibold" to="/login">Login</Link>
                <Link className="text-white bg-orange-500 px-4 py-2 rounded-full font-semibold" to="/signup">Sign Up</Link>
            </div>
            <div onClick={handleClick} className="md:hidden flex items-center">
                 <Bar />
            </div>
            {open && <div className="md:hidden top-16 bg-white absolute border right-1 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg">
                    <a href="/" className="hover:bg-gray-100 p-2">Home</a>
                    <a href="/companies" className="hover:bg-gray-100 p-2">Companies</a>
                    <a href="/jobs" className="hover:bg-gray-100 p-2">Jobs</a>
                </div>}
        </div>
    </div>
  )
}

export default Navbar