import {useNavigate} from "react-router-dom"

export default function Error404() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
             style={{
                 backgroundImage: "url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                 backgroundSize: "cover",
                 backgroundPosition: "center"
             }}
        >

            <div className="max-w-md w-full text-center space-y-6 text-gray-200">
                {/* 404 Graphic */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full bg-red-50 opacity-60"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        <div className="text-9xl font-bold text-yellow-900">404</div>
                        <div className="text-2xl font-medium text-gray-800 mt-2">Page Not Found</div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-2 text-center mt-4 text-gray-200">
                    <h1 className="text-3xl font-bold">Oops! Lost in Space?</h1>
                    <p className="">
                        The page you're looking for doesn't exist or has been moved.
                        Don't worry, we'll help you find your way back home.
                    </p>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <button onClick={() => navigate('/')}>
                        <span className="
                        border-2 border-yellow-600 bg-yellow-900 text-yellow-400 font-semibold py-2 px-4 rounded-lg
                        hover:border-yellow-400 hover:cursor-pointer hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out">Go Back Home</span>
                    </button>
                </div>


                {/* Optional Help Link */}
                <div className="pt-4">
                    <p className="text-sm text-gray-200">
                        Need help? <a href="#" className="text-yellow-500 hover:text-yellow-300">Contact support</a>
                    </p>
                </div>
            </div>
        </div>
    )
}