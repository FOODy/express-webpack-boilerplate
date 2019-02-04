import ReactDOM from 'react-dom';
import App from './app';
import React from 'react';

render();

function render() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app'),
  );
}

if (module.hot) {
  module.hot.accept('./app.tsx', () => {
    render();
  });
}