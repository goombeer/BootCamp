import React, { Component } from 'react'
import  TodoTemplate from  "./../templates/todo-template";
import { Link } from 'react-router-dom';

class ListPage extends Component {
  constructor() {
    super()
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
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>TEST</td>
              <td>2019/06/11</td>
              <td>藤本さんにいっぱいおごる</td>
              <td>完了</td>
            </tr>
            <tr>
              <th>2</th>
              <td>TEST</td>
              <td>2019/06/11</td>
              <td>藤本さんにいっぱいおごる</td>
              <td>完了</td>
            </tr>
            <tr>
              <th>3</th>
              <td>TEST</td>
              <td>2019/06/11</td>
              <td>藤本さんにいっぱいおごる</td>
              <td>完了</td>
            </tr>
          </tbody>
        </table>
      </div>
      </TodoTemplate>
    )
  }
}

export default ListPage;