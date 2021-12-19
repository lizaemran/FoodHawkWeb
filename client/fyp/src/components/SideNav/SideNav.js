import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome, AiOutlineLogout, AiOutlineInfoCircle, AiOutlineMail} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
const SideNav = () => {
    return (
        <div className='bg-dark p-5 d-flex flex-column justify-content-center align-items-center shadow-lg' style={{ borderRadius:"0px 10px 10px 0px"}}>
            <Link to="/"><AiOutlineHome className='fs-2 my-5'/></Link>
            <Link to="/"><CgProfile className='fs-2 my-5'/></Link>
            <Link to="/"><AiOutlineMail className='fs-2 my-5'/></Link>
            <Link to="/"><AiOutlineInfoCircle className='fs-2 my-5'/></Link>
            <Link to="/"><AiOutlineLogout className='fs-2 my-5'/></Link>

        </div>
    )
}

export default SideNav
