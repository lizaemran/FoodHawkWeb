import React from 'react'
import SideNav from "../components/SideNav/SideNav";
import { Accordion, Container, Navbar } from "react-bootstrap";
const UserInfo = () => {
  return (
      <>
      <SideNav/>
      <Container className="px-5 d-flex flex-column justify-content-center align-items-center">
      <h4 className="text-center mb-3">FAQs</h4>
      <Accordion className="w-75">
      <Accordion.Item className="mb-3" eventKey="0">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>What does Food Hawk do?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              We simply take your submitted order and send it to the restaurant through a completely automated process, so you don’t have to deal with all the hassle of ordering and we make sure that you receive your order on time, every-time!
            </p>
          </Accordion.Body>
        </Accordion.Item>
        
        
        <Accordion.Item className="mb-3" eventKey="3">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>
              How is my order on foodhawk placed?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            <p> You can place the order by doing the following:</p>
            <ul>
            <li>Signin / Register to your account.</li>
            <li>Drop your actual location</li>
            <li>Choose the restaurant</li>
            <li>Select the items you want to order</li>
            <li>Add them to cart</li>
            <li>Select payment method</li>
            <li>Click on checkout</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="4">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>Can my order be cancelled?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              Yes, you can get the order canceled if it is pending on foodhawk. If the order is processed, it cannot be cancelled
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="8">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>I just placed an order, but I’m not sure if you got it. What do I do?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              Once you are logged in to the app, go to the "My Orders" section and see if your order is listed. If your order is listed, then check the order status as “Successful”.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="9">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>Can I rate or write a review about my recent order?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              Yes. You can rate and write a review about your previous order. 
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="10">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>How can I track my order?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              You can track your order inside your 'My orders' section by selecting your ongoing order. It makes waiting easier, right?
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="11">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>How many payment method does foodhawk support?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              You can pay for your order by selecting any of the following payment methods:
            </p>
            <ul>
            <li>Cash-on-delivery</li>
            <li>JazzCash credit card</li>
            <li>JazzCash wallet</li>
            <li>Easypaisa wallet</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="mb-3" eventKey="12">
          <Accordion.Header className="">
            <h6 style={{ color: "#ef5023" }}>Can i edit my profile details?</h6>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {" "}
              Yes. All you have to do is click on edit my profile.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>
      </Container>
    </>
  )
}

export default UserInfo