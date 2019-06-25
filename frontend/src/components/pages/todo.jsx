import React, { Component } from 'react'
import  TodoTemplate from  "./../templates/todo-template";
import  ENDPOINT from "../../utils/http";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Checkauth from "../../utils/checkauth";

class TodoPage extends Component {
  constructor(props) {
    super(props)
    console.log("=====")
    Checkauth()
    console.log("=====")
    this.state = {
      content: null,
      deadline: null,
      punishment: null,
    }
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  registTodo(e) {
    const data = {
      content: this.state.content,
      deadline: this.state.deadline,
      punishment: this.state.punishment,
      user_id: JSON.parse(localStorage.getItem("user_id"))
    };
    const token = localStorage.getItem("jwttoken");
    // json形式でbodyに含める
    axios({
      method: "POST",
      url: ENDPOINT.TODO_CREARE,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      data: JSON.stringify(data)
    })
    .then((results) => {
      console.log(results.data.status)
      if(results.data.status === 200){
        toast.success("登録しました！")
        this.setState({ content : "", deadline : "", punishment: "" })
      } else {
        toast.error("登録に失敗しました")
      }
      
    })
    .catch((e) => {
      console.log(e)
      toast.error("登録に失敗しました")
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
      <TodoTemplate>
        <div className="box">
          <form action="" className="form" onSubmit={this.onHandleSubmit}>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="content" onChange={this.onChangeInput.bind(this, 'content')} value={this.state.content} placeholder="何をするんだい？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="date" className="input" name="deadline"  onChange={this.onChangeInput.bind(this, 'deadline')} value={this.state.deadline}  placeholder="いつまでにするんだい？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" name="punishment" onChange={this.onChangeInput.bind(this, 'punishment')} value={this.state.punishment} placeholder="できなかったらどうする？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth" onClick={ () => this.registTodo() }>ToDoに登録する</button>
                </div>
              </div>
            </div>
            <ToastContainer />
          </form>
        </div>
      </TodoTemplate>
    )
  }
}

export default TodoPage;