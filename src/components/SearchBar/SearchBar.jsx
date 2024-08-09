

function SearchBar({ columnFilters, setColumnFilters , title }) {
    const valueTitle = columnFilters.find(f => f.id == title)?.value || "";

    function handleChange(id, value) {
        setColumnFilters((prev) => prev.filter(f => f.id !== id).concat({ id, value }))
    }
    return (
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute w-4 opacity-30 top-1/3 right-7 "><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
            <input type="search" value={valueTitle} onChange={(e) => handleChange(title, e.target.value)} placeholder="جستجو" className="bg-sand px-8 py-3 pr-14 rounded-full shadow-inner w-80 focus-visible:outline-sandals" />
        </div>
    )
}

export default SearchBar