import uuid from 'node-uuid';
import React from 'react';
import ReactDOM from 'react-dom';

let app = document.createElement('div');
document.body.appendChild(app);
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpacks'
        }, {
          id: uuid.v4(),
          task: 'Learn React2'
        }, {
          id: uuid.v4(),
          task: 'Do lkllll'
        }
      ]
    };
  }
  addNote(){
    this.setState({
      notes:this.state.notes.concat([{
        id:uuid.v4(),
        task:new Date().getTime()+' 测试'
      }])
    });
  }
  render() {
    const notes = this.state.notes;
    return (
      <div>

        <button onClick={()=>this.addNote()}>增加Task</button>

        <ul>{notes.map(note => <li key={note.id}>{note.task}</li>)}</ul>
      </div>
    );

  }


}
ReactDOM.render(< App / >, app);
