import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  SingupPage  from "./pages/signup";
import  LoginPage  from "./pages/login";
import  TodoPage  from "./pages/todo";
import  ResetPasswordPage  from "./pages/reset-password";
import  ListPage  from "./pages/list";
import  ConfirmEmailPage  from "./pages/confirmemail";
import  ActivationlPage  from "./pages/activation";


export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/signup' component={SingupPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/resetpassword' component={ResetPasswordPage} />
      <Route path='/confirm' component={ConfirmEmailPage} />
      <Route path='/activation' component={ActivationlPage} />
      {/* これより下のルートは認証が必要 */}
      <Route path='/todo' component={TodoPage} />
      <Route path='/list' component={ListPage} />
    </Switch>
  </BrowserRouter>
);
  
