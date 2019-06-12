import React, { Component } from 'react'
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';


class SingupPage extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <DefalutTemplate>
        <div className="box">
          <form action="" className="form">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="姓"/>
                  </div>
                </div>
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="名"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="登録用メールアドレス"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="password" className="input" placeholder="パスワード"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth">Grafferアカウントを登録する</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <p className="has-text-centered is-size-7">
          <Link
            to={`/login`}
            className="has-text-weight-bold">
            Grafferアカウントをお持ちですか？
          </Link>
        </p>
      </DefalutTemplate>
    );
  };
};

export default SingupPage;