import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>PAL Learning Platform</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>

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
                        <Link href="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
                <p className="text-gray-600 mb-6">Discover thousands of courses to start your learning journey</p>

                <div className="flex mb-8">
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search for courses"
                            className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-md">Search</button>
                </div>
            </main>
        </>
    );
}
