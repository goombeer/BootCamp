import * as React from "react";
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';

class ResetPasswordPage extends React.Component {

  render() {
    return (
      <DefalutTemplate>
        <div className="box">
          <form action="" className="form">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="メールアドレス"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth">パスワード再設定メールを送信</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <p className="has-text-centered is-size-7">
        <Link
            to={`/login`}
            className="has-text-weight-bold">
            ログイン画面に戻る
        </Link>
        </p>
    </DefalutTemplate>
    );
};
  };
  export default ResetPasswordPage;