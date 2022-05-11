import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import {
  getRestaurantDashboardAsync,
  logoutUser,
  patchCloseTimeAsync,
  patchEnableBookingAsync,
  patchOpenTimeAsync,
  patchOverviewAsync,
  resendVerifyRestaurantAsync,
} from "../redux/auth";
import { useLocation } from "react-router-dom";
import {Button, Col, Container, Form,Image,Row,Table,} from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import FormPopUp from "../components/FormPopUp";
import UpdateStatus from "../components/UpdateStatus";
import AddProduct from "../components/AddProduct";
import {
  getOrderDetailAsync,
  getRestaurantImagesAsync,
  uploadImageAsync,
} from "../redux/Slice";
import {MdUpdate} from "react-icons/md";
import { AiOutlineEdit, AiOutlineWarning } from "react-icons/ai";
import UpdateProduct from "../components/UpdateProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const RestaurantDashboard = ({ pId, setPId, isEditP, setIsEditP }) => {
  const dispatch = useDispatch();
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [overView, setOverView] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [closeHours, setCloseHours] = useState("");
  const [openMinutes, setOpenMinutes] = useState("");
  const [closeMinutes, setCloseMinutes] = useState("");
  const d = new Date();
  const month = d.toLocaleString("default", { month: "long" });
  const date = d.getDate() + " " + month + ", " + d.getFullYear();
  const time =
    d.getHours() + "h " + d.getMinutes() + "m " + d.getSeconds() + "s";
  var location = useLocation();
  location = location.pathname;
  const username = location.split("/")[3];
  const status = useSelector((state) => state?.auth?.status);
  const isConfirmed = useSelector((state) => state?.auth?.isConfirmed);
  const name = useSelector((state) => state?.auth?.name);
  const rating = useSelector((state) => state?.auth?.rating);
  const img = useSelector((state) => state?.auth?.image);
  const products = useSelector((state) => state?.auth?.products);
  const r_id = useSelector((state) => state?.auth?.id);
  const email = useSelector((state) => state?.auth?.email);
  const orders = useSelector((state) => state?.auth?.orders);
  const current_overview = useSelector((state) => state?.auth?.overview);
  const gallery = useSelector((state) => state?.auth?.gallery);
  const openTime = useSelector((state) => state?.auth?.openTime);
  const closeTime = useSelector((state) => state?.auth?.closeTime);
  const [bookingCheck, setBookingCheck] = useState(false);
  useEffect(() => {
    dispatch(getRestaurantDashboardAsync(username));
    // dispatch(getRestaurantImagesAsync());
  }, []); //have to re-render on status change
  // useEffect(()=> {
  //     for(let i = 0; i < orders?.length; i++){
  //         dispatch(getOrderDetailAsync({
  //             id : orders[i]
  //         }));
  //     }
  // }, [orders]) //have to re-render on status change
  const renderStars = (stars) => {
    let rating = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        rating.push(<i class="fas fa-star golden"></i>);
      } else {
        rating.push(<i class="fas fa-star grey"></i>);
      }
    }
    return rating;
  };
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  // const order_detail = useSelector((state) => state?.restaurants?.order_detail);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    dispatch(
      uploadImageAsync({ restaurant_id: r_id, data: base64EncodedImage })
    );
    setPreviewSource("");
  };

  const loadImages = async (imageId) => {
    // console.log(imageId)
  };
  return (
    <div className="bg-secondary">
      <ToastContainer />
      {isConfirmed === false && (
        <div className="alert alert-danger mb-1 text-center" style={{fontSize:'12px'}} role="alert">
          <AiOutlineWarning className="fs-5" /> Confirm Your Email to Add
          Products{" "}
          <a
            className="border border-1 border-danger text-decoration-none text-danger rounded-3 p-1 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() =>
              dispatch(resendVerifyRestaurantAsync({ email: email }))
            }
          >
            Resend
          </a>
        </div>
      )}
      <section>
        <Container className="p-3">
          <Row
            className=""
            style={{backgroundColor: "rgba(0, 0, 0, 0.5)",borderRadius: "20px",backdropFilter: "blur(20px)",}}>
            <Col className="d-flex flex-column p-3 text-white" style={{fontSize:'12px'}}>
              <p className="fs-6">
                Hello, <b>{name}</b>
              </p>
              <p>
                Date: <b>{date}</b>
              </p>
              <p>
                Time: <b>{time}</b>
              </p>
              <p>
                You are currently{" "}
                <span
                  className="fw-bold"
                  style={{ color: status ? "#37d339" : "red" }}
                >
                  {status ? "Active" : "Inactive"}
                </span>{" "}
                <span
                  className=""
                  onClick={() => setIsEditStatus(true)}
                  style={{
                    fontSize: "11px",
                    cursor: "pointer",
                    color: "#2121d1",
                  }}
                >
                  <AiOutlineEdit className="text-white fs-6" />
                </span>
              </p>
              <p className="d-flex justify-content-start align-items-center" style={{marginBottom:'0px'}}>Open: 
              <Form.Control onChange={(e) => setOpenHours(e.target.value)} type='Number' placeholder='9' max='23' min='1' className="mx-1" style={{width:'70px', height:'30px'}} /> 
              <Form.Control onChange={(e) => setOpenMinutes(e.target.value)} type='Number' placeholder='00' max='23' min='1' className="mx-1" style={{width:'70px', height:'30px'}} /> 
                <MdUpdate className='fs-4' onClick={(e) => {dispatch(patchOpenTimeAsync({
                  id: r_id,
                  openTime : openHours + ":" + openMinutes,
                }))}} style={{cursor:'pointer'}} />
                </p>
                <span className='text-warning mt-1' style={{fontSize:'10px'}}>
                24h format(time to start getting booking from)</span>
                <p className="d-flex justify-content-start align-items-center mt-1"  style={{marginBottom:'0px'}}>Close: 
              <Form.Control onChange={(e) => setCloseHours(e.target.value)} type='Number' placeholder='20' max='23' min='1' className="mx-1" style={{width:'70px', height:'30px'}} /> 
              <Form.Control onChange={(e) => setCloseMinutes(e.target.value)} type='Number' placeholder='00' max='23' min='1' className="mx-1" style={{width:'70px', height:'30px'}} /> 
                <MdUpdate className='fs-4' onClick={(e) => {dispatch(patchCloseTimeAsync({
                  id: r_id,
                  closeTime : closeHours + ":" + closeMinutes,
                }))}} style={{cursor:'pointer'}}  />
                </p>
                <span className='text-warning mt-1' style={{fontSize:'10px'}}>
                24h format(time to stop getting booking from)</span>
            </Col>
            <Col className="d-flex  justify-content-center align-items-center">
              <Image src={img} className="w-25 h-auto" />
            </Col>
            <Col className="text-end p-3">
              <div className="d-flex flex-column justify-content-around align-items-end">
                <div>{renderStars(rating)}</div>
                <AiOutlineLogout
                  className="mt-5 fs-3 bg-light p-1"
                  onClick={logOut}
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                />
                <label className="d-flex flex-column justify-content-center align-items-center mt-5">
                  <span className="text-white" style={{fontSize:'10px'}}>Enable Booking</span>
                  <Switch checked={bookingCheck} onChange={(e) => {setBookingCheck(!bookingCheck); 
                    dispatch(patchEnableBookingAsync({
                      id: r_id,
                      enableBooking : !bookingCheck,
                    }))}}  />
                </label>
              </div>

            </Col>
          </Row>
        </Container>
        {isEditStatus && (!
          <FormPopUp title="Update Status" setIsOpen={setIsEditStatus}>
            <UpdateStatus rId={r_id} status={status} />
          </FormPopUp>
        )}
      </section>

      <section>
        <Container className="">
          <div
            className="p-3 text-white d-flex flex-column justify-content-end align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              backdropFilter: "blur(2px)",
            }}
          >
            <p style={{fontSize:'12px'}}>
              Let customers know about your restaurant. Add some overview about
              your cuisines and other specialities.
            </p>
            <Form.Control
              as="textarea"
              className="w-75"
              placeholder="Our restaurnt is ... We have spacialities are... We are busy during... Our best dishes..."
              value={overView}
              onChange={(e) => setOverView(e.target.value)}
            />
            <p
              className="py-1 px-2 text-center text-white rounded-3 w-25 my-2"
              onClick={() =>
                dispatch(patchOverviewAsync({ id: r_id, overview: overView }))
              }
              style={{
                backgroundColor: "#ef5023",
                marginBottom: "0px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Set Overview
            </p>
            {current_overview !== undefined && (
              <p style={{fontSize:'12px'}}>
                Current Overview: <i>{current_overview}</i>
              </p>
            )}
          </div>
        </Container>
      </section>

      <section>
        <Container className="mt-3">
          <div
            className="p-3 text-white d-flex flex-column justify-content-end align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              backdropFilter: "blur(2px)",
            }}
          >
            <p style={{fontSize:'12px'}}>Add images to your gallery.</p>
            <div className="w-25">
              <Form.Control
                id="images"
                type="file"
                className="form-input"
                value={fileInputState}
                onChange={handleFileInputChange}
                name="image"
                accept="image/png, image/jpeg"
              />
              <Button
                onClick={handleSubmitFile}
                className="py-1 px-2 text-center text-white rounded-3 w-100 my-2"
                style={{
                  backgroundColor: "#ef5023",
                  marginBottom: "0px",
                  cursor: "pointer",
                  border: "1px solid #ef5023",
                  fontSize: "12px",
                }}
              >
                Upload
              </Button>
            </div>

            {previewSource && (
              <div
                className="p-3"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "20px",
                  backdropFilter: "blur(2px)",
                }}
              >
                <img
                  src={previewSource}
                  className=""
                  style={{ height: "300px" }}
                  alt="chosen"
                />
              </div>
            )}
            <div className="my-3 d-flex flex-column justify-content-center align-items-center shadow bg-dark py-2 px-4 rounded-3">
              <h6>Gallery</h6>
              <h6>Total: {gallery?.length} Images</h6>
              <div className="d-flex flex-wrap ">
                {gallery?.slice(0, 4).map((image, index) => {
                  return (
                    <div key={index} className="p-1 m-1">
                      <img
                        src={image}
                        className=""
                        style={{ height: "125px" }}
                        alt="chosen"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div></div>
        </Container>
      </section>

      <section>
        <Container className="p-3">
          <Row
            className="text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              backdropFilter: "blur(2px)",
            }}
          >
            <Col>
              <p className="pt-3">
                Products : <span className="fw-bold">{products?.length}</span>
              </p>
            </Col>
            <Col className="d-flex justify-content-end align-items-center p-3">
              {isConfirmed === true && (
                <p
                  className="py-1 px-2 text-white rounded-3"
                  onClick={() => setIsAdd(true)}
                  style={{
                    backgroundColor: "#ef5023",
                    marginBottom: "0px",
                    cursor: "pointer",
                  }}
                >
                  Add Product
                </p>
              )}
            </Col>

            <Row>
              <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                <thead className="text-white">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Category</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((u, index) => (
                    <tr className="text-white">
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={u?.image}
                          className=""
                          style={{ height: "70px", width: "70px" }}
                        />
                      </td>
                      <td className="">{u?.name}</td>
                      <td className="">{u?.price}</td>
                      <td className="">{u?.discount}</td>
                      <td className="">{u?.category}</td>
                      <td>
                        <Col className="d-flex justify-content-center align-items-center p-3">
                          <p
                            className="py-1 px-2 text-white rounded-3"
                            onClick={() => {
                              setPId(u._id);
                              setIsEditP(true);
                            }}
                            style={{
                              backgroundColor: "#ef5023",
                              marginBottom: "0px",
                              cursor: "pointer",
                            }}
                          >
                            Edit Product
                          </p>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Row>
        </Container>
      </section>

      <section>
        <Container className="p-3">
          <Row
            className="text-white p-3"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
            }}
          >
            <p>
              Orders: <b>{orders?.length}</b>{" "}
            </p>
            <Table striped bordered hover responsive style={{fontSize:'12px'}}>
              <thead className="text-white">
                <tr>
                  <th>#</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((u, index) => (
                  <tr className="text-white">
                    <td>{index + 1}</td>
                    <td>
                      {u.products?.map((p, index) => (
                        <div>
                          {p} {index > p.length && <span>, </span>}
                        </div>
                      ))}
                    </td>
                    <td
                      className={`${
                        u?.status === "pending"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      {u?.status}
                    </td>
                    <td className="">{u?.total_price}</td>
                    <td className="">{u?.date}</td>
                    <td className="">{u?.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p className="text-white">
              Total Sales:{" "}
              <b>
                PKR{" "}
                {orders?.reduce((acc, cur) => {
                  if (cur.status === "delivered") return acc + cur.total_price;
                  else return acc;
                }, 0)}
              </b>
            </p>
          </Row>
        </Container>
      </section>
      {isAdd && (
        <FormPopUp title="Add Product" setIsOpen={setIsAdd}>
          <AddProduct rId={r_id} />
        </FormPopUp>
      )}
      {isEditP && (
        <FormPopUp title="UpdateProduct" setIsOpen={setIsEditP}>
          <UpdateProduct rId={r_id} pId={pId} setPId={setPId} />
        </FormPopUp>
      )}
    </div>
  );
};
export default RestaurantDashboard;
