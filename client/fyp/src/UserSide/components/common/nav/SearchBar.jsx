import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchBar.css";

function Searchbar(props) {
  const { 
    onSearch 
  } = props;

  const [searchText, setSearchText] = useState('')

  const handleInput = (e) => {
    const text = e.target.value
    setSearchText(text)
  }

  const handleEnterKeyPressed = (e) => {
    if(e.key=== 'Enter') {
      onSearch(searchText)
    }
  }
return (
    <div className="text-center1">
        <input className='searchinput'
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="eg:Cheese Burger"
          className=" p-3 position-relative"
          style={{fontSize:"14px",borderRadius:"10px", border:"none", height:"55px", width:"25rem"}}/>
          <Button className="text-white position-absolute " style={{backgroundColor:"#ef5023" , border:"none", left:"57.5%", top:"48%", fontSize:"14px"}}>Search</Button>
      </div>
    
  );
}

export default Searchbar;