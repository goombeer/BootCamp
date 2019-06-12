import React, { Component } from 'react'
import  TodoTemplate from  "./../templates/todo-template";
import { Link } from 'react-router-dom';

class TodoPage extends Component {
  constructor() {
      super()
  }

  render() {
    return (
      <TodoTemplate>
        <div className="box">
          <form action="" className="form">
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="何をするんだい？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="date" className="input" placeholder="いつまでにするんだい？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="control">
                    <input type="text" className="input" placeholder="できなかったらどうする？"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <button className="button is-info is-fullwidth">ToDoに登録する</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </TodoTemplate>
    )
  }
}

export default TodoPage;