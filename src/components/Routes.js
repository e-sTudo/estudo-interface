import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import Login from "../pages/Login"
import ClassesList from "../pages/ClassesList";
import Presentation from "../pages/Presentation";
import MediaCollection from "../pages/MediaCollection";
import ScriptEditor from "../pages/ScriptEditor";
import Grid from "@material-ui/core/Grid";

const api = 'http://localhost:5000/';
const classname = 'firstclass';


export default function Routes() {
    return (
        <Switch>
            <Route path="/class/:id">
                <Presentation />
            </Route>
            <Route path="/media/:id">
                <MediaCollection />
            </Route>
            <Route path="/edit/:id">
                <ScriptEditor contentPath={api+'/static/'+classname+'.md'} editmode={true}/>
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <ClassesList />
            </Route>
        </Switch>
    );
}