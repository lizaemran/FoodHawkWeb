import React from "react";

const pytonExec = () => {
  /* const python_code=print('wje');
    const pyodide =window.pyodide;
    pyodide.runpython(python_code);*/
};
const Recommendationsystem = ({ userType }) => {
  return (
    <div>
      {userType === "user" && (
        <>
          <h3>Recommended for you </h3>
          <p>based on your past order with us</p>
        </>
      )}
      {/* <button onClick={pytonExec}>Click</button> */}
    </div>
  );
};

export default Recommendationsystem;
