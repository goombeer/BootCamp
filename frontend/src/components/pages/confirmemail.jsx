import React, { Component } from 'react'
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';

class ConfirmEmailPage extends Component {
    constructor(props){
      super(props)
    }
  
    render() {
      return (
        <DefalutTemplate>
          <div className="box">
            ご入力いただいたメールアドレスに、アカウント認証のメールを送付しました。
            ご確認いただき、指定のURLをクリックしてください。
          </div>
          <p className="has-text-centered is-size-7">
            <Link
              to={`/login`}
              className="has-text-weight-bold">
              ログインページに戻る
            </Link>
          </p>
        </DefalutTemplate>
      );
    };
  };
  
  export default ConfirmEmailPage;