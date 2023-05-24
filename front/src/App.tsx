import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import Secured from "./Secured";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC =() => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React for keycloak root-app</p>
          <Router>
              <div className="container">
                  <Route exact path="/" component={Login}/>
                  <Route path="/secured" component={Secured}/>
              </div>
          </Router>
      </header>
    </div>
  );
}

export default App;
