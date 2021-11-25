import React, {useState} from 'react'
import {motion} from "framer-motion";
const Toggle = ({children, title }) => {
    const [toggle, setToggle] = useState(false);
    return (
        <motion.div Layout className="toggle-heading" onClick = {()=> setToggle(!toggle)}>
            <motion.h1>{title}</motion.h1>
            <div className={toggle ? `triangle openTriangle` :  `triangle`}></div>
            {toggle ? children : ""}
        </motion.div>
    )
}
export default Toggle