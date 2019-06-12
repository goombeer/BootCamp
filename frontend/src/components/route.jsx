import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  SingupPage  from "./pages/signup";
import  LoginPage  from "./pages/login";
import  TodoPage  from "./pages/todo";
import  ResetPasswordPage  from "./pages/reset-password";
import  ListPage  from "./pages/list";
import  LogoutPage  from "./pages/logout";


export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/signup' component={SingupPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/todo' component={TodoPage} />
      <Route path='/resetpassword' component={ResetPasswordPage} />
      <Route path='/list' component={ListPage} />
      <Route path='/logout' component={LogoutPage} />
    </Switch>
  </BrowserRouter>
);
  
