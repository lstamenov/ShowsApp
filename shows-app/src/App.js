import './App.css';
import { Route, Switch } from 'react-router';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import ShowOverview from './components/show-overview/ShowOverview';
import Episodes from './components/episodes/Episodes';
import ShowSearch from './components/search-shows/ShowSearch';


function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/shows/search" exact>
        <ShowSearch />
      </Route>
      <Route path="/shows/:id" exact>
        <ShowOverview />
      </Route>
      <Route to="/seasons/:id/episodes" exact>
        <Episodes />
      </Route>
      </ Switch>
    </div>
  );
}

export default App;
