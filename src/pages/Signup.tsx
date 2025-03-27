export default function Signup() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
            <p className="text-gray-600 mb-6">Create an account to start your learning journey</p>

            <form className="max-w-md space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                        placeholder="John Doe"
                        required
                    />
                </div>
            </form>
        </div>

    )
}