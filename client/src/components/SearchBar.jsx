import { useState } from "react";


function SearchBar({ recipes , onSearch, keyword}) {

  return <div className="search-bar">
    <input type="text" onChange={onSearch} value={keyword} name="search" id="search" placeholder="search..."/>
  </div>
}


export default SearchBar;