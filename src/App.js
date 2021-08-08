import './App.css';
import SignUp from './components/Register/SignUp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MyOrders from './components/MyOrders/MyOrder';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { useState } from 'react';

function App() {

  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <Router>
        <NavBar toggle={toggle} setToggle={setToggle} />
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/myorders" component={MyOrders}></Route>
        <Route path="/home" component={Home}><Home toggle={toggle} setToggle={setToggle} /> </Route>
        <Route exact path="/" component={Home}><Home toggle={toggle} setToggle={setToggle} /></Route>
      </Router>
    </div>
  );
}

export default App;
