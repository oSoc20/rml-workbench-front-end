import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProjectPage from '../pages/ProjectPage';
import DashboardPage from '../pages/DashboardPage';

export default class RouteHandler extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ProjectPage} />
        <Route path="/:id/dashboard" exact component={DashboardPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
}
