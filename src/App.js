import { createBrowserHistory } from "history";
import {
  Route, Switch
} from "react-router-dom";
import AdminView from "./admin-site/AdminView";
import './App.css';
import PrivateRoute from "./config/PrivateRoute";
import MainView from "./pub-website/MainView";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/admin" component={AdminView} />
        <Route path={`/`}><MainView history={hist} /></Route>
      </Switch>

    </div>
  );
}

export default App;
