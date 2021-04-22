import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/main.css";
import ProjectShow from "./ProjectShow";

const App = props => {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/projects/:id" component={ProjectShow} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default hot(App);
