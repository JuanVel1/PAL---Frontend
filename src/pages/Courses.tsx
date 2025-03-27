import React from 'react';
import CourseCard from '../Components/CourseCard.tsx';
import CategoryButton from '../Components/CategoryButton.tsx';
import {Link} from "react-router-dom";
import {Search} from "lucide-react"

const Courses: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center space-x-2 text-sm mb-8">
                    <Link to={"/"} className="text-gray-600 hover:text-purple-600">
                        Home
                    </Link>
                    <span className="text-gray-400">&gt;</span>
                    <span className="text-gray-800">Courses</span>
                </div>

                <section className="mb-12">
                    <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
                    <p className="text-gray-600 mb-6">Discover thousands of courses to start your learning
                        journey</p>

                    <div className="flex mb-8">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search for courses"
                                className="w-full px-4 py-3 rounded-l-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Search size={20}/>
                            </button>
                        </div>
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-md">Search
                        </button>
                    </div>

                    {/* Course Filters */}
                    <div className="border-b border-gray-200 mb-8">
                        <div className="flex space-x-8">
                            <button className="text-gray-800 border-b-2 border-purple-600 pb-2 font-medium">All
                                Courses
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Popular</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">New</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Free</button>
                            <button className="text-gray-600 hover:text-gray-800 pb-2">Premium</button>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        <CategoryButton label="Programming"/>
                        <CategoryButton label="Design"/>
                        <CategoryButton label="Business"/>
                        <CategoryButton label="Marketing"/>
                        <CategoryButton label="Languages"/>
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
                            courseId={"1"}
                        />
                        <CourseCard
                            icon="layout"
                            category="Design"
                            title="UI/UX Fundamentals"
                            description="Master the principles of user interface and experience design"
                            courseId={"2"}
                        />
                        <CourseCard
                            icon="trending-up"
                            category="Business"
                            title="Digital Marketing"
                            description="Comprehensive guide to modern marketing strategies"
                            courseId={"3"}
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
                            courseId={"4"}

                        />
                        <CourseCard
                            icon="globe"
                            category="Languages"
                            title="Spanish for Beginners"
                            description="Learn conversational Spanish in just 10 weeks"
                            courseId={"5"}

                        />
                        <CourseCard
                            icon="building"
                            category="Business"
                            title="Financial Literacy"
                            description="Essential knowledge for personal and business finance"
                            courseId={"5"}

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
    );
};

export default Courses;