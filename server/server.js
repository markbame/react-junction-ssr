import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../src/store';
import renderhtml from './renderhtml';
import App from '../src/app';
import path from 'path';
import axios from 'axios';

const server = express();
server.disable('x-powered-by');
server.use('/images', express.static(path.join(__dirname, '../src/assets/images')));
server.use('/scripts', express.static('build'));
server.use('/styles', express.static('lib'));
server.use('/build', express.static(path.join(__dirname, 'build')));
server.use('/build', express.static('build'));
server.use(express.static(path.join(__dirname, '../')));
server.get('/favicon.ico', (req, res) => res.send(''));

server.get('*', async (req, res) => {
      var data = {}
      try {
        axios.get('http://api.tvmaze.com/search/shows?q=girls').then(res => {
        data = {shows : res.data}
         console.log(res.data)
      }).catch(function(error) {
	         console.log(error)
      })
    const store = configureStore({ data });

    const intialHTML = renderToString(
      <Provider store={store}>
        <App />
      </Provider>);
    const state = store.getState();
    res.send(renderhtml(intialHTML, state));
  } catch (err) {
    console.error('error', err);
    res.status(500).send(`${err}`);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log('listening on ', PORT));
