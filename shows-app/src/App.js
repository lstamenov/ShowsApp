import logo from './logo.svg';
import './App.css';
import { Route, useLocation } from 'react-router';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import ShowOverview from './components/show-overview/ShowOverview';
import Episodes from './components/episodes/Episodes';


function App() {
  return (
    <div className="App">
      <Nav />
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route to="/shows/:id/seasons/:id/episodes" exact>
        <Episodes />
      </Route>
      <Route path="/shows/:id" exact>
        <ShowOverview />
      </Route>
    </div>
  );
}

export default App;
