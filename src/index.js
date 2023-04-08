import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
const domain = 'dev-j5trf4h88phz0kn6.us.auth0.com';
const clientId = 'zahDvIEarwa4QVPyFaSgJ5fVwk9r0KBx';

ReactDOM.render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
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
    </Auth0Provider>
,
  document.getElementById('root')
);
