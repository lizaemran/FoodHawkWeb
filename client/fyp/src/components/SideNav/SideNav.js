import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome, AiOutlineLogout, AiOutlineInfoCircle, AiOutlineMail} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth';
const SideNav = () => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logoutUser());
    }
    return (
        <div className='bg-dark p-5 d-flex flex-column justify-content-center align-items-center shadow-lg ' style={{ borderRadius:"0px 10px 10px 0px"}}>
            <Link to="/dashboard"><AiOutlineHome className='side-link fs-2 my-5'/></Link>
            <Link to="/account"><CgProfile className='side-link fs-2 my-5'/></Link>
            <Link to="/"><AiOutlineMail className='side-link fs-2 my-5'/></Link>
            <Link to="/"><AiOutlineInfoCircle className='side-link fs-2 my-5'/></Link>
            <AiOutlineLogout onClick={logOut} className='side-link fs-2 my-5' style={{cursor:"pointer"}}/>

        </div>
    )
}

export default SideNav
