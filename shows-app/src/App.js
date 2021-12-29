import './App.css';
import { Route, Switch } from 'react-router';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import ShowOverview from './components/show-overview/ShowOverview';
import Episodes from './components/episodes/Episodes';
import ShowSearch from './components/search-shows/ShowSearch';
import ActorBio from './components/cast/ActorBio';
import ScrollToTop from './components/scroller/ScrollToTop';
import MoviesPage from './components/movies/MoviesPage';
import MovieOverview from './components/movies/movie/movie-overview/MovieOverview';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies/:id">
        <MovieOverview />
      </Route>
      <Route path="/movies" exact>
        <MoviesPage />
      </Route>
      <Route path="/actors/:id">
        <ActorBio />
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
