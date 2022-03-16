import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome, AiOutlineLogout, AiOutlineInfoCircle, AiOutlineMail} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth';
import { Image } from 'react-bootstrap';
import logo from "../../img/burger.svg";
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoReceipt } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
import jwt_decode from "jwt-decode";
import {GrUserWorker} from 'react-icons/gr';
import { useSelector } from 'react-redux';
import {MdSportsMotorsports} from 'react-icons/md';

const SideNav = () => {
    const token = useSelector((state)=> state.auth.token);
    var decoded = jwt_decode(token);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logoutUser());
    }

    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <div className=''>
        <div className=' d-none d-md-flex bg-dark p-5 flex-column justify-content-center align-items-center shadow-lg position-fixed' 
        style={{ borderRadius:"0px 20px 20px 0px", width:'7vw'}}>
            {/* <p className='mt-4 mb-5 text-center' style={{fontSize:'16px',  color: '#ef5023'}} >FOOD HAWK</p> */}
            <Link to="/dashboard"><AiOutlineHome className='side-link fs-2 mt-4 mb-5'/></Link>
            {decoded.isUser && <Link to="/user/profile"><CgProfile className='side-link fs-2 mt-4 mb-5'/></Link>}
            <Link to="/account">{decoded.isUser && <IoReceipt className='side-link fs-2 mt-4 mb-5' />}</Link>
            <Link to="/account">{decoded.isAdmin && <ImStatsDots className='side-link fs-2 mt-4 mb-5' />}</Link>
            {decoded.isAdmin && <Link to="/riders"><MdSportsMotorsports className='side-link fs-2 mt-4 mb-5'/></Link>}
            <Link to="/"><AiOutlineMail className='side-link fs-2 mt-4 mb-5'/></Link>
            <Link to="/"><AiOutlineInfoCircle className='side-link fs-2 mt-4 mb-5'/></Link>
            <AiOutlineLogout onClick={logOut} className='side-link fs-2 mt-4 mb-5' style={{cursor:"pointer"}}/>
        </div>
        <div className='d-md-none d-flex w-100 justify-content-between' style={{borderBottom:'1px solid gray', backgroundColor:'rgba(0,0,0,0.4)'}}>
            <Image onClick={()=>setMobileMenu(!mobileMenu)} src={logo} alt='logo' className='my-auto w-25 py-2' style={{height:'8vh'}} />
            <GiHamburgerMenu className='fs-3 my-auto' style={{marginRight:'25px'}} onClick={()=>setMobileMenu(!mobileMenu)}  />
        </div>
        {mobileMenu && 
        <div className='d-md-none text-white bg-dark p-4 d-flex flex-column justify-content-start align-items-center shadow-lg position-absolute' 
        style={{ borderRadius:"10px", width:'fit-content', right:'0', zIndex:'99'}}>
            <Link className='my-1 text-decoration-none text-white d-flex justify-content-start align-items-center ' to="/dashboard">
                <div className='d-flex justify-content-start align-items-center'><AiOutlineHome className='side-link fs-2 my-1'/> 
                <p style={{margin:'0px'}}>Home</p>
                </div></Link>
            <Link className='my-1 text-decoration-none text-white' to="/account"><CgProfile className='side-link fs-2 my-1'/> Profile</Link>
            <Link className='my-1 text-decoration-none text-white' to="/"><AiOutlineMail className='side-link fs-2 my-1'/>Messages</Link>
            <Link className='my-1 text-decoration-none text-white' to="/"><AiOutlineInfoCircle className='side-link fs-2 my-1'/>Info</Link>
            <AiOutlineLogout onClick={logOut} className='side-link fs-2 my-1' style={{cursor:"pointer"}}/>
        </div>
        }
        </div>
    )
}

export default SideNav
