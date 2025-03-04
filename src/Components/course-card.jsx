import { Code, Layout, TrendingUp, Monitor, Globe, Building } from "lucide-react"
import Link from "next/link"

export default function CourseCard({ icon, category, title, description }) {
    const getIcon = () => {
        switch (icon) {
            case "code":
                return <Code className="w-5 h-5 text-purple-600" />
            case "layout":
                return <Layout className="w-5 h-5 text-purple-600" />
            case "trending-up":
                return <TrendingUp className="w-5 h-5 text-purple-600" />
            case "monitor":
                return <Monitor className="w-5 h-5 text-purple-600" />
            case "globe":
                return <Globe className="w-5 h-5 text-purple-600" />
            case "building":
                return <Building className="w-5 h-5 text-purple-600" />
            default:
                return <Code className="w-5 h-5 text-purple-600" />
        }
    }

    return (
        <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="mb-4">{getIcon()}</div>
                <div className="text-sm text-gray-600 mb-2">{category}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>
                <div className="flex items-center space-x-4">
                    <Link href="#" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
                        Enroll Now
                    </Link>
                    <Link href="#" className="text-purple-600 hover:text-purple-700 text-sm">
                        Preview
                    </Link>
                </div>
            </div>
        </div>
    )
}

