import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { PrivateRoute, RestrictedRoute } from './components/SpecialRoutes';


function App() {

  const login = false;

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact loggedIn={login} path="/" component={Home}></PrivateRoute>
          <RestrictedRoute exact loggedIn={login} path="/login" component={Login} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
