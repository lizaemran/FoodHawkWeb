import React, {useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { getAllRidersAsync } from "../redux/admin";
import {AiTwotonePhone, AiFillMail} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
const Riders = () => {
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect (()=>{
        dispatch(getAllRidersAsync());
    }, [])
    const riders = useSelector((state)=> state?.admin.riders);
    return (
        <div>
             <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-4'>
               <div className='px-4 py-3 mb-3 text-white w-25 d-flex justify-content-start align-items-center' style={{backgroundColor:'rgb(239, 80, 35)',borderRadius:"5px"}}>
                    <p className='fs-5' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
               </div>
               <h5>Riders</h5>
               <div className=' d-flex flex-wrap' >
               {riders?.map((r) => 
                <div key={r?._id} className=' d-flex' >
                   <div className="d-flex flex-column pt-2 px-3 my-2 shadow-sm" style={{marginRight:'10px',borderRadius:'10px',width:'20rem',height:'fit-content',border:'1px solid rgb(239, 80, 35,0.1)', color:'#ef5023', background:'linear-gradient(to bottom, rgba(125,185,232,0) 0%,rgba(239,80,35,0.12) 100%)'}} >
                        <div className="d-flex justify-content-between position-relative">
                        <Link className="text-decoration-none" to={`rider/${r?._id}`}> 
                        <p style={{color:'#ef5023'}}><BsFillPersonFill />{r?.name}</p>
                        </Link>
                        <p className="text-capitalize rounded-3 px-1 position-absolute shadow-sm" style={{backgroundColor:r?.status === 'available' ? 'rgb(37, 240, 102,0.5)' : 'rgb(227, 56, 0,0.5)', color:r?.status === 'available' ? 'rgb(37, 211, 102)':'rgb(227, 56, 0)', top:'-20px', right:'0px'}}>{r?.status}</p>
                        </div>
                        <p><b><AiTwotonePhone /></b> <a className="text-decoration-none " style={{color:'#ef5023'}} href={`tel:${r?.phone}`}>{r?.phone}</a></p>
                        <p><b><AiFillMail /></b>{r?.email}</p>
                    </div>
                </div>
               )}
               </div>
            </Container>
            </Col>
            </Row>
        </div>
    )
}
export default Riders