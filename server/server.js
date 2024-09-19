import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import ViteExpress from 'vite-express';









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

// // User flow is broken, redirect from React Router is not working because of error message when trying to access restricted route
// const loginRequired = (req, res, next) => {
//   if (!req.session.userId) {
//     return res.status(401).send({
//       message: 'Unauthorized',
//       success: false
//     });
//   } else {
//     next();
//   };
// };

// Auth endpoints
import { authFuncs } from './authCtrl.js';
const { sessionCheck, register, login, logout } = authFuncs;

app.get('/api/session-check', sessionCheck);
app.post('/api/login', login);
app.get('/api/logout', logout);
app.post('/api/register', register);

// Dashboard endpoints
import { dashboardFuncs } from './dashboardCtrl.js';
const { getDashboardData } = dashboardFuncs;

// app.get('/api/dashboard', getDashboardData)

// Build endpoints
import { buildFuncs } from './buildsCtrl.js';
const { getBuildsData, newBuild, getUserBuilds } = buildFuncs;

app.get('/api/builds', getBuildsData)
app.post('/api/new-build', newBuild)
app.get('/api/user-builds', getUserBuilds)

// Part endpoints
import { partFuncs } from './partsCtrl.js';
const { getPartsData } = partFuncs;

app.get('/api/parts', getPartsData )

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`)
});