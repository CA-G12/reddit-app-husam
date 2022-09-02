const app = require('./app')

const environment = require('./config/environment');

const { port } = environment;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is live on http://localhost:${port}`);
});
