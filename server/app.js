const { join } = require('path');
const express = require('express');
// const router1 = require('./router');

class App {
  constructor(router) {
    this.app = express();
    // this.router = router;

    this.initMiddelwares();
    this.initRoutes();
  }

  initMiddelwares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(join(__dirname, '..', 'public')));
  }

  initRoutes() {
    // this.app.use('/api/v1', this.router);
  }
}

const { app } = new App();
console.log(app)
module.exports = app;
