import React, { useState, useEffect } from "react";
import "../styles/nav.css";
import { deleteCart } from "../redux/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
const Nav = ({ setSearch, search }) => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const [isCart, setIsCart] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(
      cartItems.map((cI) => ({
        item: products.filter((p) => cI.id === p._id),
        count: cI.countItems,
      }))
    );
  }, [cartItems]);
  const handleDeleted = (cId) => {
    dispatch(
      deleteCart({
        id: cId,
      })
    );
  };

  const d = new Date();
  const month = d.toLocaleString("default", { month: "long" });
  const date = d.getDate() + " " + month + ", " + d.getFullYear();
  var decoded = jwt_decode(token);
  return (
    <>
      <div className="center my-3 ">
        <input
          className=" bg-light"
          type="text"
          placeholder="Search for restaurants"
          style={{ width: "40%" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value || "");
          }}
        />
        <div className="center">
          <p className="nav-date fs-6" style={{ margin: "0px" }}>
            {date}
          </p>

          {decoded.isUser === true && (
            <>
              <div onMouseLeave={() => setIsCart(false)}>
                <div
                  onMouseEnter={() => setIsCart(true)}
                  className={
                    isCart
                      ? `cart-icon-activate  cart-icon nav-date`
                      : `cart-icon nav-date`
                  }
                >
                  <i className="fas fa-shopping-basket fs-3"></i>
                  <div className="cart-number">
                    <p>{total}</p>
                  </div>
                </div>

                {isCart && (
                  <div className="cart-drop-menu">
                    {total === 0 ? (
                      <h1 style={{ fontSize: "0.8rem" }}>Cart is empty</h1>
                    ) : (
                      cartItems !== undefined &&
                      cartItems.map((c) => (
                        <div className="cart-menu">
                          <img
                            src={c.image}
                            style={{ marginRight: "5px" }}
                            alt="cart-image"
                          />
                          <h6 style={{ marginRight: "5px" }}>{c.name}</h6>
                          <h6 style={{ marginRight: "5px" }}>
                            x{c.countItems}
                          </h6>
                          <h6 style={{ marginRight: "5px" }}>{c.price}</h6>
                          <span onClick={() => handleDeleted(c.id)}>
                            <i className="fas fa-times"></i>
                          </span>
                        </div>
                      ))
                    )}
                    {total !== 0 && (
                      <Link to="/Cart">
                        <button
                          className="py-2"
                          style={{ fontSize: "12px", borderRadius: "5px" }}
                        >
                          View Cart
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {(decoded.isUser || decoded.isAdmin) && (
            <div className="nav-date fs-6" style={{ marginLeft: "10px" }}>
              <FaUserCircle className="fs-4" />{" "}
              {auth.firstName || auth.username}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
