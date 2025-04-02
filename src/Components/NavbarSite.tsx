import {Link} from "react-router-dom"

interface NavbarSiteProps {
    page: string;
}

const NavbarSite: React.FC<NavbarSiteProps> = ({page}) => {
    return (
        <div className="flex items-center space-x-2 text-sm mb-8">
            <Link to={"/"} className="text-gray-600 hover:text-purple-600">
                Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-800">{page}</span>
        </div>
    )
}
export default NavbarSite;