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
          task: 'Learn Webspacsk1'
        }, {
          id: uuid.v4(),
          task: 'Learn React2'
        }, {
          id: uuid.v4(),
          task: 'Do laundry3'
        }
      ]
    };
  }
  addNote(e){
    this.setState({
      notes:this.state.notes.concat([{
        id:uuid.v4(),
        task:new Date+' New Tassk'
      }])
    });
  }
  render() {
    const notes = this.state.notes;
    return (
      <div>

        <button onClick={e=>this.addNote(e)}>+</button>

        <ul>{notes.map(note => <li key={note.id}>{note.task}</li>)}</ul>
      </div>
    );

  }


}
ReactDOM.render(< App / >, app);
