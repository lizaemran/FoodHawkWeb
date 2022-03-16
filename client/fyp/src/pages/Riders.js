import React, {useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { getAllRidersAsync } from "../redux/admin";
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
               <div className='px-4 py-3 mb-3 bg-danger bg-opacity-10 text-white w-25 d-flex justify-content-start align-items-center' style={{borderRadius:"5px"}}>
                    <p className='fs-4' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
               </div>
               <h5>Riders</h5>
               {riders?.map((r) => 
                <div key={r?._id} className=' d-flex' >
                   <Link className="text-decoration-none" to={`rider/${r?._id}`}> 
                   <div className="d-flex flex-column pt-2 px-3 my-2 " style={{borderRadius:'10px',width:'20rem',height:'fit-content',border:'2px solid #ef5023', color:'#ef5023'}} >
                        <div className="d-flex justify-content-between">
                        <p><b>Name:</b> {r?.name}</p>
                        <p className="text-capitalize text-white rounded-3 px-1" style={{backgroundColor:r?.status === 'available' ? '#25d366' : 'white'}}>{r?.status}</p>
                        </div>
                        <p><b>Phone:</b> <a className="text-decoration-none " style={{color:'#ef5023', borderBottom:'1px solid #ef5023'}} href={`tel:${r?.phone}`}>{r?.phone}</a></p>
                        <p><b>Email:</b>{r?.email}</p>
                   
                    </div>
                    </Link>
                </div>
               )}
            </Container>
            </Col>
            </Row>
        </div>
    )
}
export default Riders