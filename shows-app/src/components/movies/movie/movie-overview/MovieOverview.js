import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import './MovieOverview.css';
import SyncLoader from 'react-spinners/SyncLoader';


const MovieOverview = () => {
    const [movie, setMovie] = useState();
    const movieId = useLocation().pathname.split('/')[2];
    const [trailers, setTrailers] = useState();
    const API_KEY = '9467dada6c562150e0606a619c9ba8ff';
    const [movieCast, setMovieCast] = useState();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
        .then(res => setTrailers(res.data))
        .catch(err => console.error(err))
    }, [movieId])


    useEffect(() => {
        if(movie){
            const genresElement = document.getElementById('genres');
            genresElement.innerHTML = 'Genres: ';
            movie.genres.forEach(g => {
                const genreElement = document.createElement('span');
                genreElement.setAttribute('class', 'trending-movie-genre movie-overview-genre');
                genreElement.textContent = g.name;
                genresElement.appendChild(genreElement);
            })
        }
    }, [movie]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(res => setMovie(res.data))
        .catch(err => console.error(err));        
    }, [movieId]);


    useEffect(() => {
        if(movieId){
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
            .then(res => setMovieCast(res.data))
            .catch(err => console.error(err));
        }
    }, [movieId]);

    return(
        <>
            {movie && <div className="movie-overview-container" style={{background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) no-repeat fixed 0px 0px/100vw 100vh`}}>
                <div className="movie-overview-main-details">
                    <div className="movie-overview-details-cnt">
                        <img className="movie-overview-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster"></img>
                        <div className="movie-overview-details">
                            <h2 className="movie-overview-title">{movie.original_title}</h2>
                            <div className="movie-details">
                                <p className="movie-overview-detail" id="genres">Genres: </p>
                                <p className="movie-overview-detail">Official website: <a href={movie.homepage}>{movie.homepage}</a></p>
                                <p className="movie-overview-detail">Release date: <span className="movie-overview-detail-bold">{movie.release_date}</span></p>
                                <p className="movie-overview-detail">Original language: <span className="movie-overview-detail-bold">{movie.original_language.toUpperCase()}</span></p>
                                <p className="movie-overview-detail">Runtime: <span className="movie-overview-detail-bold">{movie.runtime} min</span></p>
                                <p className="movie-overview-detail">Budget: <span className="movie-overview-detail-bold">{movie.budget}$</span></p>
                                <p className="movie-overview-detail">Revenue: <span className="movie-overview-detail-bold">{movie.revenue}$</span></p>
                                <p className="movie-overview-detail">Rating: <span className="movie-overview-detail-bold">{movie.vote_average}</span></p>
                                <div className="movie-overview-cont">
                                    <h3 className="movie-overview-title">Overview</h3>
                                    <p className="overview">{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                   {
                    trailers.results.length > 0 && 
                    <div className="movie-overview-trailer-container">
                        <h3 className="movie-overview-trailer-title">Official trailer</h3>
                        {trailers ? <iframe className="movie-overview-trailer" title={movie.original_title} src={trailers.results.length > 0 ? `https://www.youtube.com/embed/${trailers.results[trailers.results.length - 1].key}` : ''}></iframe>
                            : <SyncLoader />
                        }
                    </div>
                   }
                </div>
            </div>}
        </>
    )
}

export default MovieOverview;
