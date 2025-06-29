import { useState } from "react"

const SearchBox = () => {
    const [search, setSearch] = useState('')
  return (
    <div>
        <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        className="border p-3 rounded-full outline-none md:w-[350px]"
        placeholder="SEARCH USER"
         />
    </div>
  )
}

export default SearchBox