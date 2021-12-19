import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import MainPage from '../src/pages/MainPage';
import Form from '../src/pages/SignUp/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";
import FormLogin from './pages/SignIn/FormLogin';
function App() {
  return (
    <div >
        <Switch>
        <Route path='/SignUp' component={Form} />
        <Route path='/SignIn' component={FormLogin} />
        <Route exact path='/' component={MainPage} />
        <Route path='/Cart' component={Cart} />
        <Route path='/Admin' component={Home} />
          
          
      </Switch>
    </div>
  );
};
export default App;
