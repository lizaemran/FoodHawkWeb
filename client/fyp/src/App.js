import React, {useEffect, useState} from 'react';
import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import MainPage from '../src/pages/MainPage';
import Form from '../src/pages/SignUp/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";
import FormLogin from './pages/SignIn/FormLogin';
import AdminLogin from './pages/AdminLogin';
import Account from './pages/Account';
import Restaurant from './pages/Restaurant';
import RestaurantSignUp from './pages/RestaurantSignUp';
import RestaurantDashboard from './pages/RestaurantDashboard';
import RestaurantLogin from './pages/RestaurantLogin';
import RiderSignUp from './pages/RiderSignUp';
import RiderLogin from './pages/RiderLogin';
import RiderDashboard from './pages/RiderDashboard';
import TrackOrder from './pages/TrackOrder';
import { getRestaurantsAsync } from './redux/Slice';
import Results from './pages/Results';
function App() {
  const [pId, setPId] = useState("");
  const [isEditP, setIsEditP] = useState(false);
  const [search, setSearch] = useState("");
  // useEffect (() => {
  //   dispatch(getRestaurantsAsync());
  // }, [])
  return (
    <div >
        <Switch>
        <Route path='/SignUp' component={Form} />
        <Route path='/SignIn' component={FormLogin} />
        <Route exact path='/' component={MainPage} />
        <Route path='/results/:search' component={Results} />
        <Route path='/Cart' component={() => <Cart search={search} setSearch={setSearch} />} />
        <Route path='/dashboard' component={()=> <Home pId={pId} setPId={setPId} isEditP={isEditP} setIsEditP={setIsEditP} search={search} setSearch={setSearch} />} />
        <Route path='/track-order/:id' component={TrackOrder} />
        <Route path='/admin-login' component={AdminLogin} />
        <Route path='/account' component={Account}/>
        <Route exact path='/restaurant/:name' component={()=> <Restaurant pId={pId} setPId={setPId} isEditP={isEditP} setIsEditP={setIsEditP} search={search} setSearch={setSearch} />}/>
        <Route exact path='/restaurant/register' component={RestaurantSignUp} />
        <Route exact path='/restaurant/login' component={RestaurantLogin} />
        <Route exact path='/restaurant/dashboard/:username' component={RestaurantDashboard} />
        <Route exact path='/rider/register' component={RiderSignUp} />
        <Route exact path='/rider/login' component={RiderLogin} />
        <Route exact path='/rider/dashboard/' component={RiderDashboard} />


      </Switch>
    </div>
  );
};
export default App;
