import Home from '../pages/Home'
import Post from '../pages/Post'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">upload</Link>
            </li>
          </ul>
        </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
