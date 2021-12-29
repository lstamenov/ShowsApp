import './KnownForMovie.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KnownForMovie = ({ movie }) => {
    const [tvMazeId, setTvMazeId] = useState();

    const getTvMazeShowId = async () => {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${movie.name}`);
        const data = await res.data;
        data.forEach(el => {
            if(el.show.name === movie.name){
                setTvMazeId(el.show.id);
            }
        })
    }


    useEffect(() => {
        getTvMazeShowId();
    }, []);

    return (
        <div className="known-for-movie">
            <img className="known-for-movie-poster" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}></img>
            <h2 className="known-for-movie-name">{movie.media_type === 'tv' ? `${movie.name} (${movie.first_air_date.substring(0, 4)})` : `${movie.original_title} (${movie.release_date.substring(0, 4)})`}</h2>
            <Link to={`/shows/${tvMazeId}`}>
                <button className="show-more-btn known-for-movie-btn">Show more</button>
            </Link>
        </div>
    )
}

export default KnownForMovie;