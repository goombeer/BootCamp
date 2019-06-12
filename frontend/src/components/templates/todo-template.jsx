import * as React from "react";
import Header from '../organisms/header';

export default class TodoTemplate extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="hero is-fullheight">
            <div className="hero-body">
            <div className="container">
                {this.props.children}
            </div>
            </div>
        </div>
      </div>
    )
  }
}