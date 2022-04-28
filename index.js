const express = require('express');
const { default: helmet } = require('helmet');
const { APP_PORT } = require('./lib/config');
const v1Routes = require('./routes/v1');

// deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
const app = express();

// middlewares setup
app.use(helmet());
app.use(express.json());
// route setup
app.use('/health', (_req, res) => res.send('OK'));
app.use('/v1', v1Routes)

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});

module.exports = app;
