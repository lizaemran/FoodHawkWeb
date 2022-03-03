import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchBar.css";
import {useHistory} from 'react-router-dom';
import { useEffect } from "react";
function Searchbar(props) {
  const { 
    onSearch 
  } = props;

  const [searchText, setSearchText] = useState('')

  const handleInput = (e) => {
    const text = e.target.value
    setSearchText(text)
  }
  const history = useHistory();
  const handleEnterKeyPressed = (e) => {
    if(e.key=== 'Enter') {
      history.push(`/results/${searchText}`);
    }
    
  }
  const handleClicked= (e) => {
      history.push(`/results/${searchText}`);
  }

return (
    <div className="d-flex justify-content-center align-items-center">
        <input className=''
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="Search restaurants, food items..."
          className="p-3"
          style={{fontSize:"14px",borderRadius:"10px 0px 0px 10px", border:"none",marginTop:"0px"}}/>
          <Button onClick={handleClicked} className="text-white p-3" style={{height:"fit-content", backgroundColor:"#ef5023" , border:"none", fontSize:"14px", borderRadius:"0px 10px 10px 0px"}}>Search</Button>
      </div>
    
  );
}

export default Searchbar;