import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameContainer from './containers/GameContainer';
import mainReducer from './reducers';

import './styles/app.scss';

const store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.querySelector('#container'),
);

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
