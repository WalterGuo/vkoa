import React from 'react';
import ReactDOM from 'react-dom';


export default class App extends React.Component {
    render() {
      const names = ['John', 'Jill', 'Jack'];

      return <div >
        < h2 > Names < /h2>

      { /* This is a list of names */ } < ul className = "names" > {
        names.map(name =>
          < li className = "name" > {
            name
          } < /li>
        )
      } < /ul> < /div>;
    }
  }
  // export default () => <div>Learn Webpack</div>;
ReactDOM.render( < App / > , document.getElementById('container'));
