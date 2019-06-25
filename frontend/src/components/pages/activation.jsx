import React, { Component } from 'react'
import  DefalutTemplate from  "./../templates/defalut-template";
import { Link } from 'react-router-dom';
import  ENDPOINT from "../../utils/http";
import axios from 'axios';
import queryString from 'query-string';

class ActivationlPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        activation: false
      }
      const qs = queryString.parse(this.props.location.search)
      const data = {
        auth_token: qs.token
      };
      // json形式でbodyに含める
      axios({
        method: "POST",
        url: ENDPOINT.AUTH,
        data: JSON.stringify(data)
      })
      .then((results) => {
        console.log(results.data)
        if (results.data.status === 200) {
            this.setState( { activation: true } )
            localStorage.setItem("jwttoken", results.data.token)
        }
      })
      .catch((e) => {
        
      })
    }
    
    render() {
      return (
        <DefalutTemplate>
          {this.state.activation ? 
          <div className="box">
            アカウントの本登録が完了しました。
            下記のリンクからログインをしてください。
            <p className="has-text-centered is-size-7">
              <Link
                to={`/login`}
                className="has-text-weight-bold">
                ログインする
              </Link>
            </p>
          </div>
          :
          <div className="box">
          アカウントの本登録に失敗しました。
            <p className="has-text-centered is-size-7">
                <Link
                to={`/login`}
                className="has-text-weight-bold">
                ログインする
                </Link>
            </p>
          </div>
          }
        </DefalutTemplate>
      );
    };
  };
  
  export default ActivationlPage;