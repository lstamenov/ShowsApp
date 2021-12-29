import { useLayoutEffect, useState } from 'react';
import './TrendingMovie.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

const TrendingMovie = ({movie}) => {
    const [genres, setGenres] = useState([]);
    const API_KEY = '9467dada6c562150e0606a619c9ba8ff';

    const fetchGenres = async () => {
        const genres = [];
        for(let i = 0; i < movie.genre_ids.length; i++){
            const id = movie.genre_ids[i];
            const res = await axios.get(`https://api.themoviedb.org/3/genre/${id}?api_key=${API_KEY}&language=en-US`)
            const data = await res.data;
            genres.push(await data);
        }
        
        setGenres(genres);
    }

    useLayoutEffect(() => {
        fetchGenres();
    }, []);


    return (
        <div className="trending-movie-wrapper">
            <img className="trending-movie-poster" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="movie-poster"></img>
            <h3 className="trending-movie-name">{movie.original_title}</h3>
            <p className="trending-movie-overview">{movie.overview.substring(0, 300)}...</p>
            <div className="trending-movie-genres">
                {genres && genres.map((g, index) => <span className="trending-movie-genre" key={index}>{g.name}</span>)}
            </div>
            <Link to={`/movies/${movie.id}`}><button className="show-more-btn trending-movie-show-more-btn">Show more</button></Link>
        </div>
    )
}

export default TrendingMovie;