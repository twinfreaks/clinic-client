import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {connect} from 'react-redux';
import Index from './src';
import { Provider } from 'react-redux';
import configureStore from './src/store/configure-store';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
      <Index/>
    </Provider>
    ), document.getElementById('root')
);