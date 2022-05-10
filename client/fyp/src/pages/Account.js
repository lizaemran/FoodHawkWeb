import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Table,
  Image,
  Button,
  Modal,
} from "react-bootstrap";
import SideNav from "../components/SideNav/SideNav";
import { Link } from "react-router-dom";
// import Footer from '../UserSide/components/common/Footer/Footer'
import { useSelector } from "react-redux";
import { BiRestaurant } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { GiCash, GiNotebook, GiFullMotorcycleHelmet } from "react-icons/gi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import {GrNote} from 'react-icons/gr';
import { useDispatch } from "react-redux";
import {
  getAllOrdersAsync,
  getAllRidersAsync,
  getAllUsersAsync,
  getRestaurantWithClassificationAsync,
} from "../redux/admin";
import jwt_decode from "jwt-decode";
import { getAllOrdersForUserAsync } from "../redux/user";
import { getRestaurantsAsync } from "../redux/Slice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Account = () => {
  const restaurant_details = useSelector(
    (state) => state?.admin?.restaurant_details
  );

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement("span");
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = "2px";
        span.style.marginRight = "10px";
        span.style.height = "10px";
        span.style.width = "10px";
        span.style.display = "inline-block";

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;

        const text = document.createTextNode(body);

        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
  };
  const options = {
    responsive: true,
    options: {
      animation: true,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
      },
    },
  };
  const labels = ["Positive", "Negative"];
  var positiveClassified = restaurant_details?.orders?.reduce((acc, curr) => {
    if (curr?.classification == "positive") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  var negativeClassified = restaurant_details?.orders?.reduce((acc, curr) => {
    if (curr?.classification == "negative") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [positiveClassified, negativeClassified],
        borderColor: "#39B54A",
        backgroundColor: "#a8d4ae",
      },
    ],
  };
  const [modalShow, setModalShow] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const users = useSelector((state) => state?.admin.users);
  const riders = useSelector((state) => state?.admin.riders);
  const orders = useSelector((state) => state?.admin.orders);
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isRider, setIsRider] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const dispatch = useDispatch();
  var decoded = jwt_decode(token);
  useEffect(() => {
    if (decoded.isAdmin == true) {
      dispatch(getAllUsersAsync());
      dispatch(getAllRidersAsync());
      dispatch(getAllOrdersAsync());
      dispatch(getRestaurantsAsync());
    } else if (decoded.isUser == true) {
      dispatch(getAllOrdersForUserAsync(auth?.id));
    } else {
      alert("You are not authorized to view this page");
    }
  }, [dispatch]);
  const allOrders = useSelector((state) => state?.user?.allOrders);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {restaurant_details?.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reviews Analysis</h4>
          <Line options={options} data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <div>
        <Row>
          <Col xl={1} lg={1} md={1} sm={12} xs={12}>
            <SideNav />
          </Col>
          <Col xl={11} lg={11} md={11} sm={12} xs={12}>
            <Container className="p-4">
              <div
                className="px-4 py-3 text-white w-25 d-flex justify-content-start align-items-center"
                style={{ borderRadius: "5px", backgroundColor: "#EF5023" }}
              >
                <p className="fs-5" style={{ marginBottom: "0px" }}>
                  Hello, {auth.firstName || auth.username}
                </p>
              </div>
              {decoded.isAdmin === true && (
                <>
                  <Row className="py-3 text-white justify-content-center align-items-center">
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      onClick={() => {
                        setIsRestaurant(true);
                        setIsRider(false);
                        setIsUser(false);
                        setIsOrder(false);
                      }}
                      className="admin__tabs p-1 m-1 d-flex justify-content-between align-items-center"
                      style={{
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        backgroundColor: "rgb(252, 87, 5,0.7)",
                      }}
                    >
                      <BiRestaurant className="fs-1 text-white" />
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginBottom: "0px" }}>
                          {restaurants?.length}
                        </p>
                        <p
                          style={{ marginBottom: "0px", marginLeft: "5px" }}
                          className=""
                        >
                          Restaurants
                        </p>
                      </div>
                    </Col>
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      onClick={() => {
                        setIsRestaurant(false);
                        setIsRider(false);
                        setIsUser(true);
                        setIsOrder(false);
                        setIsSales(false);
                      }}
                      className="admin__tabs p-1 m-1 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "rgb(252, 87, 5,0.7)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <FiUsers className="fs-1 text-white" />
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginBottom: "0px" }}>{users.length}</p>
                        <p
                          style={{ marginBottom: "0px", marginLeft: "5px" }}
                          className=""
                        >
                          Users
                        </p>
                      </div>
                    </Col>
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      onClick={() => {
                        setIsRestaurant(false);
                        setIsRider(false);
                        setIsUser(false);
                        setIsOrder(false);
                        setIsSales(true);
                      }}
                      className="admin__tabs p-1 m-1 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "rgb(252, 87, 5,0.7)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <GiCash className="fs-1 text-white" />
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginBottom: "0px" }}>
                          PKR{" "}
                          {orders?.reduce((acc, cur) => {
                            if (cur.status === "delivered")
                              return acc + cur.total_price;
                            else return acc;
                          }, 0)}
                        </p>
                        <p
                          style={{ marginBottom: "0px", marginLeft: "5px" }}
                          className=""
                        >
                          Sales
                        </p>
                      </div>
                    </Col>
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      onClick={() => {
                        setIsRestaurant(false);
                        setIsRider(false);
                        setIsUser(false);
                        setIsOrder(true);
                        setIsSales(false);
                      }}
                      className="admin__tabs  p-1 m-1 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "rgb(252, 87, 5,0.7)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <GiNotebook className="fs-2 text-white" style={{}} />
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginBottom: "0px" }}>{orders?.length}</p>
                        <p
                          style={{ marginBottom: "0px", marginLeft: "5px" }}
                          className=""
                        >
                          Orders
                        </p>
                      </div>
                    </Col>
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={12}
                      xs={12}
                      onClick={() => {
                        setIsRestaurant(false);
                        setIsRider(true);
                        setIsUser(false);
                        setIsOrder(false);
                        setIsSales(false);
                      }}
                      className="admin__tabs p-1 m-1 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "rgb(252, 87, 5,0.7)",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <GiFullMotorcycleHelmet
                        className="fs-2 text-white"
                        style={{}}
                      />
                      <div className="d-flex justify-content-center align-items-center">
                        <p style={{ marginBottom: "0px" }}> {riders?.length}</p>
                        <p
                          style={{ marginBottom: "0px", marginLeft: "5px" }}
                          className=""
                        >
                          Riders
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {isUser && (
                      <Col>
                        <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{u.firstname}</td>
                                <td>{u.lastname}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.contact}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    )}
                    {isRestaurant && (
                      <Col>
                        <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Location</th>
                              <th>Rating</th>
                              <th>Status</th>
                              <th>Products</th>
                              <th>Reviews Analysis</th>
                            </tr>
                          </thead>
                          <tbody >
                            {restaurants.map((u, index) => (
                              <tr >
                                <td>{index + 1}</td>
                                <td>
                                  <span>
                                    {u?.name}
                                  </span>
                                </td>
                                <td>{u.location}</td>
                                <td>{u.rating}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                  {u.status === true ? (
                                    <span
                                      className="p-1 rounded-3"
                                      style={{
                                        backgroundColor:
                                          "rgb(37, 211, 102,0.2)",
                                        color: "rgb(37, 211, 102)",
                                      }}
                                    >
                                      Open
                                    </span>
                                  ) : (
                                    <span
                                      className="p-1 rounded-3"
                                      style={{
                                        backgroundColor: "rgb(227, 56, 0,0.2)",
                                        color: "rgb(227, 56, 0)",
                                      }}
                                    >
                                      Closed
                                    </span>
                                  )}
                                </td>
                                <td>{u.products?.length}</td>
                                <td 
                                className="bg-light"
                                 onClick={() => {
                                      dispatch(
                                        getRestaurantWithClassificationAsync({
                                          id: u._id,
                                        })
                                      );
                                      setModalShow(true);
                                    }}
                                    style={{ cursor: "pointer" }}>
                                      <span className='rounded-3 text-white bg-info py-2 px-3 d-flex justify-content-center align-items-center '>
                                        View
                                        </span>
                                        </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    )}
                  </Row>
                  {isSales && (
                    <div>
                      <p>
                        Total Revenue: PKR{" "}
                        <b>
                          {orders?.reduce((acc, cur) => {
                            if (cur.status === "delivered")
                              return acc + cur.total_price;
                            else return acc;
                          }, 0)}
                        </b>
                      </p>
                    </div>
                  )}
                  {isOrder && (
                    <Col>
                      <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Products</th>
                            <th>User</th>
                            <th>Restaurant</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.map((u, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                {u?.products?.map((p, index) => (
                                  <div key={index}>
                                    <Image
                                      src={p.image}
                                      style={{ width: "40px", height: "auto" }}
                                    />{" "}
                                    {p.name}
                                    <span className="mx-2">
                                      <b>{p.price}</b>
                                    </span>{" "}
                                    {index < p.length && <span> , </span>}
                                  </div>
                                ))}
                              </td>
                              <td>{u.user_id}</td>
                              <td>{u.restaurant_id}</td>
                              <td
                                className={`${
                                  u.status === "pending"
                                    ? "text-warning"
                                    : "text-success"
                                }`}
                              >
                                {u.status}
                              </td>
                              <td>{u.date}</td>
                              <td>{u.time}</td>
                              <td>
                                <Link
                                  className="text-decoration-none"
                                  to={`/order/${u?._id}`}
                                >
                                  <Button
                                    className="text-white"
                                    variant="info"
                                    size="sm"
                                  >
                                    View
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  )}
                  {isRider && (
                    <Row>
                      <Col>
                        <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {riders.map((u, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{u.name}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  )}
                </>
              )}
              {decoded.isUser == true && (
                <Row className="py-5">
                  <h3>Orders</h3>
                  <Col>
                    <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allOrders[0]?.map((u, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            {u.status === "pending" || u.status === "picked" ? (
                              <Link
                                to={`/track-order/${u._id}`}
                                className="text-decoration-none text-dark"
                              >
                                <td className="">
                                  {u.products?.map((p, index) => (
                                    <div className="d-flex flex-column">
                                      <Image
                                        src={p.image}
                                        className=""
                                        style={{
                                          width: "50px",
                                          height: "auto",
                                        }}
                                      />
                                      {p.name}{" "}
                                      <span className="fw-bold ">
                                        Rs. {p.price}
                                      </span>
                                    </div>
                                  ))}
                                </td>
                              </Link>
                            ) : (
                              <td>
                                {u.products?.map((p, index) => (
                                  <div className="d-flex flex-column">
                                    <Image
                                      src={p.image}
                                      className=""
                                      style={{ width: "50px", height: "auto" }}
                                    />{" "}
                                    {p.name}{" "}
                                    <span className="fw-bold">
                                      Rs. {p.price}
                                    </span>
                                  </div>
                                ))}
                              </td>
                            )}

                            <td>{u.total_price}</td>
                            <td
                              className={`${
                                u.status === "pending"
                                  ? "text-warning"
                                  : u.status === "picked"
                                  ? "text-primary"
                                  : "text-dark"
                              }`}
                            >
                              {u.status}
                            </td>
                            <td>{u.date}</td>
                            <td>{u.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Account;
