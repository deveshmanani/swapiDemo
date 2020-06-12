import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { USER_BASE_URL, userRoutes } from './helper/routes';
import People from './components/dashboard/People';
import Films from './components/dashboard/Films';
import NotFound from './components/notFound/NotFound';
import history from './helper/history';
import PeopleDetail from './components/details/PeopleDetail';
import FilmDetail from './components/details/FilmDetail';
import PrivateRoute from './helper/privateRoute';

function App() {
  return (
    <div className="project-wrap">
      <BrowserRouter history={history}>
      <Switch>
        <Route exact path={USER_BASE_URL} component={Login} />
        <Route exact path={userRoutes.SIGNUP} component={Signup} />
        <Route exact path={userRoutes.LOGIN} component={Login} />
        <PrivateRoute exact path={userRoutes.PEOPLE} component={People} />
        <PrivateRoute exact path={userRoutes.FILMS} component={Films} />
        <PrivateRoute exact path={`${userRoutes.PEOPLE}/:id`} component={PeopleDetail} />
        <PrivateRoute exact path={`${userRoutes.FILMS}/:id`} component={FilmDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
