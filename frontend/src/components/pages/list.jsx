import React, { Component } from 'react'
import  TodoTemplate from  "./../templates/todo-template";
import { Link } from 'react-router-dom';
import  ENDPOINT from "../../utils/http";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash-core';
import  Checkauth from "../../utils/checkauth";

class ListPage extends Component {
  constructor(props) {
    super(props)
    Checkauth()
    this.state = {
      todolist: [],
      onModal: false,
      updateTodoId: null,
      updateContent: null,
      updateDeadline: null,
      updatePunishment: null,
      updateDoneFlag: false
    }
    this.fetchTodo()
  }

  fetchTodo() {
    const token = localStorage.getItem("jwttoken");
    const user_id =  localStorage.getItem("user_id");
    console.log(user_id)
    axios({
      method: "GET",
      url: ENDPOINT.TODO_SERCH,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      params: { user_id: user_id}
    })
    .then((results) => {
      console.log(results.data.todos)
      this.setState({ todolist: results.data.todos})
    })
    .catch((e) => {
      
    })
  }

  showModal(content, deadline, punishment, id) {
    this.setState({ 
      onModal: true,
      updateTodoId: id,
      updateContent: content,
      updateDeadline: deadline,
      updatePunishment: punishment
    }) 
  }

  closeModal() {
    this.setState({ onModal: false }) 
  }

  updateTodo(){
    const token = localStorage.getItem("jwttoken");
    const data = {
      user_id: Number(localStorage.getItem("user_id")),
      todo_id: this.state.updateTodoId,
      content: this.state.updateContent,
      deadline: this.state.updateDeadline,
      punishment: this.state.updatePunishment
    }
    axios({
      method: "PUT",
      url: ENDPOINT.TODO_UPDATE,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      data: JSON.stringify(data)
    })
    .then((results) => {
      // 変更前のstateから変更したデータを探して、更新する
      const todolist = this.state.todolist
      _.forEach(todolist, (value, key) => {
        if(value.ID === results.data.todos.ID) {
          todolist[key].content =  results.data.todos.content
          todolist[key].deadline =  results.data.todos.deadline
          todolist[key].punishment =  results.data.todos.punishment
          this.setState({ todolist: todolist })
        }
      })
      this.setState({ onModal: false }) 
      toast.success("変更しました！")
    })
    .catch((e) => {
      toast.error("変更に失敗しました")
    })
  }

  doneTodo(id, done_flag) {
    if (done_flag) {
      done_flag = false
    } else {
      done_flag = true
    }
    const token = localStorage.getItem("jwttoken");
    const data = {
      user_id: Number(localStorage.getItem("user_id")),
      todo_id: id,
      done_flag: done_flag
    }
    axios({
      method: "PUT",
      url: ENDPOINT.TODO_UPDATE,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      data: JSON.stringify(data)
    })
    .then((results) => {
      // 変更前のstateから変更したデータを探して、更新する
      const todolist = this.state.todolist
      _.forEach(todolist, (value, key) => {
        if(value.ID === results.data.todos.ID) {
          todolist[key].done_flag =  results.data.todos.done_flag
          this.setState({ todolist: todolist })
        }
      })
      toast.success("変更しました！")
    })
    .catch((e) => {
      toast.error("変更に失敗しました")
    })
  }

  deleteTodo(id) {
    const token = localStorage.getItem("jwttoken");
    const data = {
      user_id: Number(localStorage.getItem("user_id")),
      todo_id: id,
      delete_flag: true
    }
    axios({
      method: "PUT",
      url: ENDPOINT.TODO_UPDATE,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      data: JSON.stringify(data)
    })
    .then((results) => {
      // 変更前のstateから変更したデータを探して、更新する
      let todolist = this.state.todolist
      todolist = _.filter(todolist, (value) => { return value.ID !== results.data.todos.ID })
      this.setState({ todolist: todolist })
      toast.success("削除しました！")
    })
    .catch((e) => {
      console.log(e)
      toast.error("削除に失敗しました")
    })
  }

  onChangeInput(property, e) {
    // ブラケット演算子でオブジェクトを作成する
    this.setState({ [property] : e.target.value });
  }

  render() {
    return (
      <TodoTemplate>
      <div className="columns is-centered">
        <table className="table is-centered is-fullwidth">
          <thead>
            <th>No</th>
            <th>タスク内容</th>
            <th>完了期限</th>
            <th>罰ゲーム</th>
            <th>進捗状況</th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            { this.state.todolist.map((todo,index) =>
            <tr>
              <th>{index + 1}</th>
              <td key={todo.ID}>{todo.content}</td>
              <td key={todo.ID}>{todo.deadline}</td>
              <td key={todo.ID}>{todo.punishment}</td>
              <td key={todo.ID}>{todo.done_flag ? "完了" : "未完了"}</td>
              <td><button className="button is-primary" key={todo.ID} onClick={this.showModal.bind(this, todo.content, todo.deadline, todo.punishment, todo.ID) }>更新</button></td>
              <td><button className="button is-link" key={todo.ID} onClick={this.doneTodo.bind(this, todo.ID, todo.done_flag) }>{todo.done_flag ? "完了" : "未完了"}</button></td>
              <td><button className="button is-danger" key={todo.ID} onClick={this.deleteTodo.bind(this, todo.ID) }>削除</button></td>
            </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
        <div className={['modal',this.state.onModal ? 'is-active' : ''].join(' ')}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <div className="control">
                      <input type="text" className="input" name="content"  onChange={this.onChangeInput.bind(this, 'updateContent')} value={this.state.updateContent} placeholder="何をするんだい？"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <div className="control">
                      <input type="date" className="input" name="deadline" onChange={this.onChangeInput.bind(this, 'updateDeadline')} value={this.state.updateDeadline} placeholder="いつまでにするんだい？"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <div className="control">
                      <input type="text" className="input" name="punishment" onChange={this.onChangeInput.bind(this, 'updatePunishment')} value={this.state.updatePunishment} placeholder="できなかったらどうする？"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <button className="button is-info is-fullwidth" onClick={ () => this.updateTodo() }>ToDoを更新する</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="modal-close is-large" onClick={ () => this.closeModal()} aria-label="close" ></button>
        </div>
      </div>
      </TodoTemplate>
    )
  }
}

export default ListPage;