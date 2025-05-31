import {Link} from "react-router-dom";

export default function Home() {

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
                          className="border-1 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition">
                        Log In
                    </Link>

                    <Link to="/signup"
                          className="border-1 px-6 py-2 bg-gray-200 text-gray-900 rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition">
                        Sign Up
                    </Link>
                </div>
                <p className="text-xl font-bold rounded-lg text-white bg-blue-900 border-1 border-rounded px-6 py-2 mt-4 max-w-md relative inline-block">
                    Explore now!
                </p>
                <div className="flex justify-center">
                    <div className="mt-6 flex space-x-4 justify-center">
                        <Link to="/categories">
                            <button
                                className="border-1 px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-yellow-500  hover:text-black transition">
                                Categories
                            </button>
                        </Link>
                    </div>
                    <div className="mt-6 flex space-x-4 justify-center">
                        <Link to="/courses">
                            <button
                                className="border-1 px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition">
                                Courses
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
