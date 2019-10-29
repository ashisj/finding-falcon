import React from 'react';
import { Switch,Route } from 'react-router-dom';
import Home from './pages/HomePage';
import AssignVehiclePage from "./pages/AssignVehiclePage";
import Result from './pages/ResultPage.js'

const Router = () => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/assignvehicles" component={AssignVehiclePage} />
                <Route exact path="/result" component={Result} />
            </Switch>
        </div>
    )
}

export default Router
