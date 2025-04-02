import {Link} from "react-router-dom";
import gsap from "gsap";

export default function Home() {
    gsap.to(
        ".star",
        {
            rotate: 360,
            duration: 2,
            repeat: -1,
            ease: "bounce",
            transformOrigin: "center center"
        }
    )
    return (
        <div className="h-screen flex flex-col items-center justify-center"
             style={{
                 backgroundImage: "url('https://images.pexels.com/photos/796206/pexels-photo-796206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                 backgroundSize: "cover",
                 backgroundPosition: "center"
             }}>
            {/* Estrella superior */}
            <img src="/assets/CS_Star_7.svg" style={{width: "10%", alignSelf: "center"}}/>

            <div className="text-center relative">
                <h1 className="text-5xl font-extrabold text-white">Welcome to PAL</h1>

                <p className="text-lg text-white mt-4 max-w-md relative inline-block">
                    The platform that empowers you to create, manage, and explore courses
                    <span className="relative">
                        effortlessly.
                        <img src="/assets/CS_Star_12.svg"
                             className="star absolute -right-5 top-1/2 transform -translate-y-1/2 w-5 opacity-80"/>
                    </span>
                </p>

                <div className="mt-6 flex space-x-4 justify-center">
                    <Link to="/login"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md transition">
                        Log In
                    </Link>

                    <Link to="/signup"
                          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg shadow-md hover:bg-gray-300 transition">
                        Sign Up
                    </Link>
                </div>
                <div className="mt-6 flex space-x-4 justify-center">
                    <Link to="/categories">
                        <button
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition">
                            Explore Categories
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
