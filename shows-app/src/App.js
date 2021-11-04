import logo from './logo.svg';
import './App.css';
import { Route, useLocation } from 'react-router';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import ShowOverview from './components/show-overview/ShowOverview';


function App() {
  return (
    <div className="App">
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/shows/:id">
        <ShowOverview />
      </Route>
    </div>
  );
}

export default App;
