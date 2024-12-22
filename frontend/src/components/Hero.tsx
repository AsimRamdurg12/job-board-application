import { Link } from "react-router-dom"
import Job from "../assets/Job.jpg"


const Hero = () => {
  return (
    <div  className="flex flex-col items-center max-w-full bg-gradient-to-b from-orange-50 to-white mx-auto mt-20">
        <div className="max-w-4xl pb-10 mt-10 flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-5xl px-2 py-5 font-bold">Your gateway to endless <span className="text-orange-500">opportunities</span> and perfect hires.</h1>
            <h3 className="text-xl sm:text-2xl font-light p-2">Job portal that connects talented professionals with forward-thinking employers for seamless success.</h3>
            <Link to="/signup" className="flex justify-center mt-8 px-8 py-3 bg-blue-600 w-fit text-xl sm:text-2xl font-medium sm:font-bold text-white rounded-lg">Get Started</Link>
        </div>
        <div className="flex justify-start mx-10 h-40 border rounded-lg bg-white">
            <img src={Job} alt="" className="h-36 rounded-lg"/>
            <div>
            <p className="text-xl font-semibold p-2">Your dream job is out there - let us help you find it</p>
            <p className="text-lg font-light p-2">Start Effortlessly, Move Seamlessly</p>
             </div>
        </div>
        
        
    </div>
  )
}

export default Hero