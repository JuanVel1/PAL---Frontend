import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <NavLink to="/" className="text-xl font-bold">
                        PAL
                    </NavLink>
                    <nav className="hidden md:flex space-x-6">
                        <NavLink to="/" className="text-gray-800 hover:text-purple-600">
                            Home
                        </NavLink>
                        <NavLink to="/courses" className="text-gray-800 hover:text-purple-600">
                            Courses
                        </NavLink>
                        <NavLink to="/about" className="text-gray-800 hover:text-purple-600">
                            About
                        </NavLink>
                        <NavLink to="/contact" className="text-gray-800 hover:text-purple-600">
                            Contact
                        </NavLink>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <NavLink to="/Login" className="text-purple-600 hover:text-purple-700">
                        Log In
                    </NavLink>
                    <NavLink to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
