import Link from "next/link.js";

export default function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-xl font-bold">
                        PAL
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-800 hover:text-purple-600">
                            Home
                        </Link>
                        <Link href="/courses" className="text-gray-800 hover:text-purple-600">
                            Courses
                        </Link>
                        <Link href="/about" className="text-gray-800 hover:text-purple-600">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-800 hover:text-purple-600">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-purple-600 hover:text-purple-700">
                        Log In
                    </Link>
                    <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}