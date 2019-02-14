import './polyfills';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

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