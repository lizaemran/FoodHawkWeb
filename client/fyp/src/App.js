import React, { useEffect, useState } from "react";
import Home from "../src/pages/Home";
import Cart from "../src/pages/Cart";
import MainPage from "../src/pages/MainPage";
import Form from "../src/pages/SignUp/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import FormLogin from "./pages/SignIn/FormLogin";
import AdminLogin from "./pages/AdminLogin";
import Account from "./pages/Account";
import Restaurant from "./pages/Restaurant";
import RestaurantSignUp from "./pages/RestaurantSignUp";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantLogin from "./pages/RestaurantLogin";
import RiderSignUp from "./pages/RiderSignUp";
import RiderLogin from "./pages/RiderLogin";
import RiderDashboard from "./pages/RiderDashboard";
import TrackOrder from "./pages/TrackOrder";
import { getRestaurantsAsync } from "./redux/Slice";
import Results from "./pages/Results";
import UserProfile from "./pages/UserProfile";
import Riders from "./pages/Riders";
import RiderDetails from "./pages/RiderDetails";
import OrderDetails from "./pages/OrderDetails";
import UserContact from "./pages/UserContact";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import VerifyEmail from "./pages/VerifyEmail";
import UserInfo from "./components/UserInfo";
function App() {
  const [pId, setPId] = useState("");
  const [isEditP, setIsEditP] = useState(false);
  const [search, setSearch] = useState("");
  // useEffect (() => {
  //   dispatch(getRestaurantsAsync());
  // }, [])
  return (
    <div>
      <Switch>
        <Route path="/user/verifyConfirm/:otp" component={VerifyEmail} />
        <Route path="/rider/verifyConfirm/:otp" component={VerifyEmail} />
        <Route path="/restaurant/verifyConfirm/:otp" component={VerifyEmail} />
        <Route path="/SignUp" component={Form} />
        <Route path="/SignIn" component={FormLogin} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/user-contact" component={UserContact} />
        <Route exact path="/riders" component={Riders} />
        <Route exact path="/rider/:id" component={RiderDetails} />
        <Route exact path="/order/:id" component={OrderDetails} />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/contact-us" component={Contact} />
        <Route exact path="/faqs" component={Faqs} />
        <Route exact path="/user-info" component={UserInfo} />
        <Route path="/results/:search" component={Results} />
        <Route exact path="/contact-us" component={Contact} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route
          path="/Cart"
          component={() => <Cart search={search} setSearch={setSearch} />}
        />
        <Route
          path="/dashboard"
          component={() => (
            <Home
              pId={pId}
              setPId={setPId}
              isEditP={isEditP}
              setIsEditP={setIsEditP}
              search={search}
              setSearch={setSearch}
            />
          )}
        />
        <Route path="/track-order/:id" component={TrackOrder} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/account" component={Account} />
        <Route
          exact
          path="/restaurant/:username"
          component={() => (
            <Restaurant
              pId={pId}
              setPId={setPId}
              isEditP={isEditP}
              setIsEditP={setIsEditP}
              search={search}
              setSearch={setSearch}
            />
          )}
        />
        <Route exact path="/restaurant-register" component={RestaurantSignUp} />
        <Route exact path="/restaurant-login" component={RestaurantLogin} />
        <Route
          exact
          path="/restaurant/dashboard/:username"
          component={() => (
            <RestaurantDashboard
              pId={pId}
              setPId={setPId}
              isEditP={isEditP}
              setIsEditP={setIsEditP}
            />
          )}
        />
        <Route exact path="/rider-register" component={RiderSignUp} />
        <Route exact path="/rider-login" component={RiderLogin} />
        <Route exact path="/rider-dashboard/" component={RiderDashboard} />
      </Switch>
    </div>
  );
}
export default App;
