import * as React from "react";
import Logo from '../atoms/logo';

export default class DefalutTemplate extends React.Component {
  render(){
    return (
      <div className="App">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-6">
                  <p className="has-text-centered">
                    <Logo/>
                    <h1 className="title is-size-5 has-text-centered">Graffer ToDo</h1>
                  </p>
                  {/*ここにpageの中身が入ってくる*/}
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};
