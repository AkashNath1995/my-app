import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import LoginPage from './components/login';
import RegistrationPage from './components/registration';
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegistrationPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

