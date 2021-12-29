import './Movies.css';
import TrendingMovie from './movie/trending-movie/TrendingMovie';

const Movies = ({movies, title}) => {
    return(
        <div className="movies-wrapper">
            <h2 className="movies-category">{title}</h2>
            {movies.results.map((m, index) => <TrendingMovie key={index} movie={m} />)}
        </div>
    )
}

export default Movies;