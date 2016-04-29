import React from 'react';
import ReactDOM from 'react-dom';

let app = document.createElement('div');
    document.body.appendChild(app);
export default class App extends React.Component {
  render() {
    const names = [{date:new Date().getTime(),name:'Jo试试shn'}, {date:new Date().getTime()*10,name:'ggg'}, {date:new Date().getTime()*100,name:'Jajjjjck'}];

    return <div>
      <h2>Names</h2>
      <ul className="names">{
        names.map(name =>
          <li className="name" key={name.date}>{name.name}</li>
        )
      }</ul>
    </div>;
  }
}
ReactDOM.render(<App />,app);
