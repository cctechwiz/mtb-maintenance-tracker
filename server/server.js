import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import ViteExpress from 'vite-express';

import { handlerFunctions } from './authCtrl.js';

const app = express();
const port = '8080';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'hello',
    saveUninitialized: false,
    resave: false,
  })
);

app.get('/api/session-check', handlerFunctions.sessionCheck);
app.post('/api/login', handlerFunctions.login);
app.get('/api/logout', handlerFunctions.logout);
app.post('/api/register', handlerFunctions.register);

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`)
});