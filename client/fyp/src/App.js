import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import MainPage from '../src/pages/MainPage';
import Form from '../src/pages/SignUp/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";
function App() {
  return (
    <div >
        <Switch>
        <Route path='/SignUp' component={Form} />
        <Route path='/User' component={MainPage} />
        <Route path='/Cart' component={Cart} />
        <Route exact path='/' component={Home} />
          
          
      </Switch>
    </div>
  );
};
export default App;
