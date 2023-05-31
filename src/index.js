import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';


ReactDOM.render(
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/profile">
        </Route>
      </Switch>
      <App/>
      <NavBar />
      </BrowserRouter>
    
,
  document.getElementById('root')
);
