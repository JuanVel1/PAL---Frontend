import {Link} from "react-router-dom";

interface CategoryButtonProps {
    label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({label}) => {
    if (label.includes("/")) {
        label = label.replace("/", "-");
    }
    return <Link to={`/categories/${label}`} className="flex items-center justify-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full">{label}</button>
    </Link>

};

export default CategoryButton;