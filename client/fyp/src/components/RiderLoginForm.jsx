import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { forgetPasswordRiderAsync, loginRiderAsync } from "../redux/auth";
const RiderLoginForm = () => {
  const [username, setUserName] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [email, setEmail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  let schemaSignIn = yup.object().shape({
    username: yup.string().required("Please enter username"),
    password: yup
      .string()
      .required("Please enter password")
      .min(5)
      .label("Password"),
  });
  const submitForm = (e) => {
    e.preventDefault();
    schemaSignIn
      .validate({ username: username, password: passwordd })
      .then(function (valid) {
        dispatch(
          loginRiderAsync({
            username: username,
            password: passwordd,
          })
        );
        setUserName("");
        setPasswordd("");
      })
      .catch((e) => {
        toast.error(e.errors[0].toString());
      });
  };
  const forgetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(
      forgetPasswordRiderAsync({
        email: email,
      })
    );
    setModalShow(false);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <h5 className="">Enter Your Email</h5>
          <input
            className="w-50 mb-1 input2 py-3 rounded-3  text-muted bg-light  "
            type="text"
            name="email"
            placeholder="Enter your email"
            style={{ fontSize: "14px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={forgetPasswordHandler}
            style={{ backgroundColor: "#ef5023", border: "1px solid #ef5023" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <Form className="d-flex flex-column">
        <Form.Label className="pt-1">
          Username*
          <Form.Control
            type="text"
            className=""
            required
            value={username}
            placeholder="abc123"
            onChange={(e) => setUserName(e.target.value)}
            style={{ border: "none", borderRadius: "5px" }}
          />
        </Form.Label>
        <Form.Label className="pt-1">
          Password*
          <Form.Control
            type="password"
            required
            value={passwordd}
            placeholder="•••••"
            onChange={(e) => setPasswordd(e.target.value)}
          />
        </Form.Label>
        <a
          className="text-white"
          onClick={() => setModalShow(true)}
          style={{ fontSize: "14px", cursor: "pointer" }}
        >
          Forgot Password?
        </a>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <a
          onClick={submitForm}
          className="mt-2 text-center text-white text-decoration-none py-2 px-3"
          style={{
            backgroundColor: "#ef5023",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </a>
      </Form>
    </div>
  );
};
export default RiderLoginForm;
