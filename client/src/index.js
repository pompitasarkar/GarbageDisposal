import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Store
import configureStore from './store';

// Components
import App from './components/App';

// Styles
import './stylesheets/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}
