import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchBar.css";
import {useHistory} from 'react-router-dom';
import { useEffect } from "react";
import {BsSearch} from 'react-icons/bs';
import * as yup from 'yup';
import {ToastContainer, toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
function Searchbar(props) {
  const { 
    onSearch ,
    inNav
  } = props;

  const [searchText, setSearchText] = useState('')

  const handleInput = (e) => {
    const text = e.target.value
    setSearchText(text)
  }
  const history = useHistory();
  let schemaSearch = yup.object().shape({
    // searchText: yup.string().required('Please enter restaurant to search'),
  });
  const handleEnterKeyPressed = (e) => {
  schemaSearch
    .validate({ searchText: searchText })
    .then(function (valid) {
    if(e.key=== 'Enter') {
      history.push(`/results/${searchText}`);
    }
  }).catch((e) => {
      toast.error(e.errors[0].toString());
    });
    
  }
  const handleClicked= (e) => {
    schemaSearch
    .validate({ searchText: searchText })
    .then(function (valid) {
      history.push(`/results/${searchText}`);
    }).catch((e) => {
      toast.error(e.errors[0].toString());
    });
  }

return (
  <>
    <ToastContainer />
    <div className="d-flex justify-content-center align-items-center">
        <input
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="Search restaurants, food items..."
          className="p-3"
          style={{fontSize:"14px",borderRadius:"10px 0px 0px 10px", border:"none",marginTop:"0px", height: inNav && '40px'}}/>
          <Button onClick={handleClicked} className="text-white p-3 d-flex justify-content-center align-items-center" 
          style={{ height: inNav ? '40px' : 'fit-content', backgroundColor:"#ef5023" , border:"none", fontSize:"14px", borderRadius:"0px 10px 10px 0px"}}>
            <BsSearch className="text-white fs-5"/>
          </Button>
      </div>
  </>
  );
}

export default Searchbar;