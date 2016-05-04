import React from 'react';
import Note from './Note';

export default ({notes})=>{
  return (
    <ul>{notes.map(note =>
        // <li key={note.id} onClick={()=>this.editNote()}>{note.task}</li>
        <li key={note.id}><Note task ={note.task}/></li>
      )}
    </ul>
  )
}
