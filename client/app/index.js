import uuid from 'node-uuid';
import React from 'react';
import ReactDOM from 'react-dom';
import Notes from './Notes';
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
  editNote(){
    console.log(this);
  }
  addNote =  () =>{
    this.setState({
      notes:this.state.notes.concat([{
        id:uuid.v4(),
        task:new Date().getTime()+' 测试'
      }])
    });
  }
  editNote = (id, task) => {
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
  };
  render() {
    const notes = this.state.notes;
    return (
      <div>

        <button onClick={this.addNote}>增加Task</button>
        <Notes notes = {notes} onEdit={this.editNote} />
      </div>
    );

  }


}
ReactDOM.render(< App / >, app);