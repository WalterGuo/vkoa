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
          task: 'Learn Webpack'
        }, {
          id: uuid.v4(),
          task: 'Learn React'
        }, {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    };
  }
  render() {
    const notes = this.state.notes;
    return (
      <div>

        <button onClick={this.addNote}>+</button>

        <ul>{notes.map(note => <li key={note.id}>{note.task}</li>)}</ul>
      </div>
    );

  }
  // We are using an experimental feature known as property
  // initializer here. It allows us to bind the method `this`
  // to point at our *App* instance.
  //
  // Alternatively we could `bind` at `constructor` using
  // a line, such as this.addNote = this.addNote.bind(this);
  addNote(){
    console.log(this);

  };
}
ReactDOM.render(< App / >, app);
