export default function Category(categoryName: string) {
    return (
        <div className="bg-white shadow-md rounded-md p-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">{categoryName}</h2>
        </div>
    )
}