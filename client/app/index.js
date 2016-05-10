import uuid from 'node-uuid';
import React from 'react';
import ReactDOM from 'react-dom';
import Notes from './Notes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
      {
        id: uuid.v4(),
        task: 'Learn '
      }, {
        id: uuid.v4(),
        task: 'Learn React2'
      }, {
        id: uuid.v4(),
        task: 'Do lkllll'
      }]
    };
  }
  deleteNote = (id,e)=>{
    e.stopPropagation();
    console.log(id);
    console.log(e);
  }
  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: new Date().getTime() + ' 测试yixa'
      }])
    });
  }
  editNote = (id, task) => {
    if (!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if (note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({
      notes
    });
  };
  render() {
    const notes = this.state.notes;
    return ( < div >

      < button onClick = {
        this.addNote
      } > 增加Task < /button> < Notes notes = {
        notes
      }
      onEdit = {
        this.editNote
      }
      onDelete ={
        this.deleteNote
      }
      /> < /div>
    );

  }


}

ReactDOM.render( < App / > , document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
