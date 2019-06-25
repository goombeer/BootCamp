import React, { Component } from 'react'
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';
import  ENDPOINT from "../../utils/http";
import axios from 'axios';
import  Checkauth from "../../utils/checkauth";

class SingupPage extends Component {
  constructor(props){
    super(props)
    Checkauth()
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      password: null
    }
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  registAcount(e) {
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    // json形式でbodyに含める
    axios({
      method: "POST",
      url: ENDPOINT.SIGNUP,
      data: JSON.stringify(data)
    })
    .then((results) => {
      console.log(results)
      this.props.history.push('/confirm')
    })
    .catch((e) => {
      console.log(e)
    })
  }

  onChangeInput(property, e) {
    // ブラケット演算子でオブジェクトを作成する
    this.setState({ [property] : e.target.value });
  }

  onHandleSubmit(e) {
    console.log('test')
    e.preventDefault()
  }

  render() {
    return (
      <DefalutTemplate>
        <div className="box">
          <form method="post" className="form" onSubmit={this.onHandleSubmit}>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="firstname" value={this.state.firstname} onChange={this.onChangeInput.bind(this, 'firstname')} placeholder="姓"/>
                  </div>
                </div>
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="lastname" value={this.state.lastname} onChange={this.onChangeInput.bind(this, 'lastname')} placeholder="名"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="email" value={this.state.email} onChange={this.onChangeInput.bind(this, 'email')} placeholder="登録用メールアドレス"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="password" className="input" name="password" onChange={this.onChangeInput.bind(this, 'password')} value={this.state.password} placeholder="パスワード"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth" onClick={ () => this.registAcount() }>Grafferアカウントを登録する</button>
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