import * as React from "react";
import { Link } from 'react-router-dom';
import Logo from '../atoms/logo';

export default class Header extends React.Component {
  render() {
    return (
      <header className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to={`/todo`}>
            <Logo/>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to={`/todo`}>
              ToDo作成
            </Link>
            <Link className="navbar-item" to={`/list`}>
              ToDo一覧
            </Link>
            <Link className="navbar-item" to={`/logout`}>
              ログアウト
            </Link>
          </div>
        </div>
      </header>
    )
  }
}