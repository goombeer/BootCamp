import * as React from "react";
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';
import  ENDPOINT from "../../utils/http";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Checkauth from "../../utils/checkauth";

class LoginPage extends React.Component {
  constructor(props){
    super(props)
    Checkauth()
    this.state = {
      email: null,
      password: null
    }
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  login(e) {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    // json形式でbodyに含める
    axios({
      method: "POST",
      url: ENDPOINT.LOGIN,
      data: JSON.stringify(data)
    })
    .then((results) => {
      toast.success("成功しました")
      localStorage.setItem("user_id", results.data.info.Userid)
      localStorage.setItem("jwttoken", results.data.token)
      this.props.history.push('/todo')
    })
    .catch((e) => {
      console.log(e)
      toast.error("失敗しました")
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
          <form action="" className="form" onSubmit={this.onHandleSubmit}>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="email" value={this.state.email} onChange={this.onChangeInput.bind(this, 'email')} placeholder="メールアドレス"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="password" className="input" onChange={this.onChangeInput.bind(this, 'password')} value={this.state.password} placeholder="パスワード"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth" onClick={ () => this.login() }>Grafferアカウントでログイン</button>
                </div>
              </div>
            </div>
          </form>
          <p className="has-text-centered is-size-7">
            <Link
              to={`/signup`}
              className="has-text-weight-bold">
              パスワードをお忘れですか？
            </Link>
           </p>
        </div>
        <p className="has-text-centered is-size-7">
          <Link
            to={`/signup`}
            className="has-text-weight-bold">
            Grafferアカウントを新しく作成しますか？
          </Link>
        </p>
        <ToastContainer />
      </DefalutTemplate>
    );
  };
};
export default LoginPage;