import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import MainPage from '../src/pages/MainPage';
import Form from '../src/pages/SignUp/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";
import FormLogin from './pages/SignIn/FormLogin';
import AdminLogin from './pages/AdminLogin';
import Account from './pages/Account';
function App() {
  return (
    <div >
        <Switch>
        <Route path='/SignUp' component={Form} />
        <Route path='/SignIn' component={FormLogin} />
        <Route exact path='/' component={MainPage} />
        <Route path='/Cart' component={Cart} />
        <Route path='/dashboard' component={Home} />
        <Route path='/admin-login' component={AdminLogin} />
        <Route path='/account' component={Account}/>
      </Switch>
    </div>
  );
};
export default App;
