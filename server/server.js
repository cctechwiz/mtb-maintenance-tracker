import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import ViteExpress from 'vite-express';

import { authFuncs } from './authCtrl.js';
const { sessionCheck, register, login, logout } = authFuncs;

import { pageLoaderFuncs } from './pageLoaderCtrl.js';
const { getDashboardData, getBuildsData } = pageLoaderFuncs;

import { buildFuncs } from './buildsCtrl.js';
const { newBuild } = buildFuncs;

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

// Auth requests
app.get('/api/session-check', sessionCheck);
app.post('/api/login', login);
app.get('/api/logout', logout);
app.post('/api/register', register);

// React Router loader requests
app.get('/api/dashboard', getDashboardData)
app.get('/api/builds', getBuildsData)

// Build requests
app.post('/api/new-build', newBuild)

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`)
});