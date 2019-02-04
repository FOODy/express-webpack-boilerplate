import express from 'express';
import path from 'path';
import {APP_HOST, APP_PORT, APP_PUBLIC_DIR} from './env';
import sessionHandler from './middleware/session-handler';

const app = express();

app.use(sessionHandler());

//
// Serve static files
//
app.use('static', express.static(APP_PUBLIC_DIR));

app.use('favicon.ico', (req, res) => {
  res.redirect(301, '/static/favicon.ico');
});

app.get('*', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(APP_PUBLIC_DIR, 'index.html'));
  } else {
    next();
  }
});

//
// Start server
//
app.listen(APP_PORT, () => {
  console.log('Listening: http://' + APP_HOST + ':' + APP_PORT);
});