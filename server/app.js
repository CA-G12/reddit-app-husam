const { join } = require('path');
const express = require('express');
const router = require('./router');

class App {
  constructor(Customrouter) {
    this.app = express();
    this.router = Customrouter;

    this.initMiddelwares();
    this.initRoutes();
  }

  initMiddelwares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(join(__dirname, '..', 'public')));
  }

  initRoutes() {
    this.app.use('/api/v1', this.router);
  }
}

const { app } = new App(router);

module.exports = app;
