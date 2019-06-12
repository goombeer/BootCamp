import * as React from "react";
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {

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
                  <div className="control">
                    <input type="password" className="input" placeholder="パスワード"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth">Grafferアカウントでログイン</button>
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
      </DefalutTemplate>
    );
  };
};
export default LoginPage;