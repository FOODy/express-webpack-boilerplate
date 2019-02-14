import express, {Application} from 'express';
import {APP_PUBLIC_DIR} from '../../env';
import path from 'path';

export default function mountStaticServeMiddleware(app: Application): void {
  app.use('static', express.static(APP_PUBLIC_DIR));

  app.get('favicon.ico', (_, res) => {
    res.redirect(301, '/static/favicon.ico');
  });

  app.get('*', (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(APP_PUBLIC_DIR, 'index.html'));
    } else {
      next();
    }
  });
}