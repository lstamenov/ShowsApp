import logo from './logo.svg';
import './App.css';
import { Route, useLocation } from 'react-router';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';


function App() {
  return (
    <div className="App">
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
    </div>
  );
}

export default App;
