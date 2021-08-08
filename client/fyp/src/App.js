import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <div >
        <Switch>
          <Route path='/Cart' component={Cart} />
          <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
