import './MoviesPage.css';
import {useEffect, useState} from 'react';
import axios from 'axios'; 
import Movies from './Movies.js';
import SyncLoader from 'react-spinners/SyncLoader';
import SearchMovies from './movie/search-movies/SearchMovies';


const MoviesPage = () => {
    const API_KEY = '9467dada6c562150e0606a619c9ba8ff';

    const [movies, setMovies] = useState();
    const [category, setCategory] = useState('Popular');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoviesByCategory = async (category) => {
        switch (category) {
            case 'Popular':
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
                .then(res => setMovies(res.data));
                break;
            case 'Top rated':
                axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
                .then(res => setMovies(res.data));
                break;
            case 'Upcoming':
                axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
                .then(res => setMovies(res.data));
                break;
        }
    }

    function optionOnClickHandler(e) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
        const elements = document.querySelectorAll('.movies-option');
        elements.forEach(element => element.setAttribute('class', 'movies-option'));
        e.currentTarget.setAttribute('class', 'movies-option movies-option-clicked');
        setCategory(e.currentTarget.textContent);
    }

    useEffect(() => {
         fetchMoviesByCategory(category);
    }, [category]);

    return(
        <div className="movies-page-container">
            <div className="movies-options">
                <button className="movies-option movies-option-clicked" onClick={optionOnClickHandler}>Popular</button>
                <button className="movies-option" onClick={optionOnClickHandler}>Top rated</button>
                <button className="movies-option" onClick={optionOnClickHandler}>Upcoming</button>
                <button className="movies-option" onClick={optionOnClickHandler}>Search</button>
            </div>
            <div className="movies-results">
                { isLoading ? <SyncLoader className="movies-page-loader" size={40} color={'gray'} margin={'5px'}/> : movies ? category === 'Search' ? <SearchMovies /> : <Movies title={category + ' movies'} movies={movies}/> : <></>}
            </div>
        </div>
    )
}

export default MoviesPage;