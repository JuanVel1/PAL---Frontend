import Link from "next/link"
import { Search } from "lucide-react"
import CourseCard from "./components/course-card"
import CategoryButton from "./components/category-button"

export default function App() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm mb-8">
                    <Link href="/" className="text-gray-600 hover:text-purple-600">
                        Home
                    </Link>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-gray-800">Courses</span>
                </div>

                {/* Explore Courses Section */}
                <section className="mb-12">
                    <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
                    <p className="text-gray-600 mb-6">Discover thousands of courses to start your learning journey</p>

                    {/* Search Bar */}
                    <div className="flex mb-8">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search for courses"
                                className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Search size={20} />
                            </button>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-md">Search</button>
                    </div>

                    {/* Course Filters */}
                    <div className="border-b border-gray-200 mb-8">
                        <div className="flex space-x-8">
                            <button className="text-gray-800 border-b-2 border-purple-600 pb-2 font-medium">All Courses</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Popular</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">New</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Free</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Premium</button>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        <CategoryButton label="Programming" />
                        <CategoryButton label="Design" />
                        <CategoryButton label="Business" />
                        <CategoryButton label="Marketing" />
                        <CategoryButton label="Languages" />
                    </div>
                </section>

                {/* Featured Courses Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Featured Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CourseCard
                            icon="code"
                            category="Programming"
                            title="Introduction to Python"
                            description="Learn Python basics and build your first application in 8 weeks"
                        />
                        <CourseCard
                            icon="layout"
                            category="Design"
                            title="UI/UX Fundamentals"
                            description="Master the principles of user interface and experience design"
                        />
                        <CourseCard
                            icon="trending-up"
                            category="Business"
                            title="Digital Marketing"
                            description="Comprehensive guide to modern marketing strategies"
                        />
                    </div>
                </section>

                {/* Most Popular Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-6">Most Popular</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CourseCard
                            icon="monitor"
                            category="Programming"
                            title="Web Development Bootcamp"
                            description="Full-stack development with HTML, CSS, JavaScript and Node.js"
                        />
                        <CourseCard
                            icon="globe"
                            category="Languages"
                            title="Spanish for Beginners"
                            description="Learn conversational Spanish in just 10 weeks"
                        />
                        <CourseCard
                            icon="building"
                            category="Business"
                            title="Financial Literacy"
                            description="Essential knowledge for personal and business finance"
                        />
                    </div>
                </section>

                {/* Load More Button */}
                <div className="flex justify-center">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md">
                        Load More Courses
                    </button>
                </div>
            </main>
        </div>
    )
}

