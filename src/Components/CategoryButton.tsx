export default function CategoryButton({ label } : { label: string }) {
    return <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full">{label}</button>
}
