import { useState } from "react"

const SearchBox = ({className}) => {
    const [search, setSearch] = useState('')
  return (
    <div>
        <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        className={`${className}`}
        placeholder="SEARCH USER"
         />
    </div>
  )
}

export default SearchBox