import React from 'react';
export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      editing:flase
    }
  }
  render(){
    if(this.state.editing){

    }
    return this.renderNote();
  }
  renderNote = () => {
    // If the user clicks a normal note, trigger editing logic.
    return <div onClick={this.edit}>{this.props.task}</div>;
  };
}
