
export const Filter = ({ onFilterChange }) => {
    return (
        <select onChange={onFilterChange} className="bg-gray-200 text-gray-700 px-8 py-2 mr-4 rounded border border-gray-300">
            <option value="">Select Filter</option>
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
        </select>
    );
}