import React from 'react';
import '../styles/forms.css';
import Draggable from 'react-draggable';
const FormPopUp = ({children, title, setIsOpen}) => {
    return (
        <Draggable bounds="parent" cancel=".children-forms">
        <div className="form-pop-up ">
            <div className="pop-up-title">{title}<i onClick={()=> {setIsOpen(false)}} class="fas fa-times"></i></div>
            <div className="children-forms shadow-sm">
            {children}
            </div>
        </div>
        </Draggable>
    )
}

export default FormPopUp
