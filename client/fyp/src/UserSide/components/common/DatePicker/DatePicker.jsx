import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../DatePicker/DatePicker.css";
function DatePicker() {
    const dateValue= new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 10);
  const enddate = new Date(new Date().getFullYear(), new Date().getMonth(), 20);
    return (
    <div className='datepicker' style={{width:"83.5%" }}>
        {/* <DatePickerComponent 
        placeholder="Enter Date" 
        value={dateValue}
        min={startDate}
        max={enddate}
        format="dd-MMM-yy"></DatePickerComponent> */}
         </div> 
    )
}

export default DatePicker
