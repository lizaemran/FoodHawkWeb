import React from "react";
import { useState, useRef } from "react";
import { Button , Image, Row} from "react-bootstrap";
import "./SearchBar.css";
import {useHistory} from 'react-router-dom';
import { useEffect } from "react";
import {BsSearch} from 'react-icons/bs';
import * as yup from 'yup';
import {ToastContainer, toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { getTop5RestaurantsAsync } from "../../../../redux/Slice";
import {Link} from 'react-router-dom';
function Searchbar(props) {
  const { 
    onSearch ,
    inNav
  } = props;

  const [searchText, setSearchText] = useState('');
  const [autoC, setAutoC] = useState(false);
  const ref = useRef(null);
  const closeDiv = (e) => {
    if(ref.current && !ref.current.contains(e.target)){
      setAutoC(false);
    }
  }
  useEffect(() => {
   document.addEventListener("click", closeDiv, true);
   return () => {
    document.addEventListener("click", closeDiv, true);
   }
  }, [])
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
      window.location.href = `/results/${searchText}`;
    }
  }).catch((e) => {
      toast.error(e.errors[0].toString());
    });
    
  }
  const handleClicked= (e) => {
    schemaSearch
    .validate({ searchText: searchText })
    .then(function (valid) {
      window.location.href = `/results/${searchText}`;
    }).catch((e) => {
      toast.error(e.errors[0].toString());
    });
  }
  const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getTop5RestaurantsAsync());
},[])
const top5Restaurants = useSelector((state)=> state.restaurants.top5Restaurants);
return (
  <>
    <ToastContainer />
    <div className="position-relative">
    <div className="d-flex justify-content-center align-items-center shadow-lg" style={{zIndex:'3'}}>
        <input
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          onClick={()=> setAutoC(true)}
          value={searchText}
          placeholder="Search restaurants, food items..."
          className="p-3"
          style={{fontSize:"14px",borderRadius: autoC ? '10px 0px 0px 0px' : "10px 0px 0px 10px", border:"none",marginTop:"0px", height: inNav && '40px'}}/>
          <Button onClick={handleClicked} className="text-white p-3 d-flex justify-content-center align-items-center" 
          style={{ height: inNav ? '40px' : 'fit-content', backgroundColor:"#ef5023" , border:"none", fontSize:"14px", borderRadius: !autoC ? "0px 10px 10px 0px" : '0px 10px 0px 0px'}}>
            <BsSearch className="text-white fs-5"/>
          </Button>
      </div>

      {autoC && 
      <div ref={ref} className="position-absolute w-100 py-3 px-3" style={{borderRadius:'0px 0px 10px 10px' ,top:'50px', height:'fit-content', backgroundColor:'#e5e5e5'}}>
      <h6 className="text-dark">Popular Restaurants</h6>
      <Row className='flex-wrap' style={{margin:"0px", height:"fit-content"}}  >
                    { top5Restaurants?.map(data => (
                              <div  className="d-flex bg-light p-2 text-dark" style={{ borderRadius:'20px' ,marginRight:'10px',  width: 'fit-content', height:'fit-content', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
                                <Link key={`${data.id}`} to={`/restaurant/${data.name}`} className='text-decoration-none d-flex text-dark'>
                                <Image src={data.image} style={{marginRight:'5px' , width:"auto", height:"50px", borderRadius:'50%', objectFit:'cover'}}/>
                                <p className="d-flex justify-content-center align-items-center text-capitalize" style={{marginBottom:'0px'}}>{data.name}</p>
                                </Link>
                              </div>
                              
                        )) }
      </Row>  
      </div>
      }
      </div>
  </>
  );
}

export default Searchbar;