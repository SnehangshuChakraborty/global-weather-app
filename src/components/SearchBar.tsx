interface SearchBarProps {
    value: string;
    onSearch: (query: string) => void;
}

const SearchBar = ({ value, onSearch }: SearchBarProps) => {
    return <input
    type="text"
    className="form-control mb-3"
    placeholder="Search cities or countries..."
    value={value}
    onChange={(e) => onSearch(e.target.value)}
  />
}

export default SearchBar;