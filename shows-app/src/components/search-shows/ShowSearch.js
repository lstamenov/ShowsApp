import './ShowSearch.css';
import { useState, useRef } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from 'axios';
import ShowSearchSuggestion from './ShowSearchSuggestion';
import TopMovie from '../top-movies/TopMovie';

const ShowSearch = () => {
    const [results, setResults] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = useRef(null);

    const searchHandler = async (setData) => {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput.current.value}`)
        await setData(await res.data);
    }

    const loadResults = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

    const getSearchResults = async () => {
        setSuggestions([]);
        searchHandler(setResults);
        loadResults();
    }


    const getSearchSuggestions = () => {
        searchHandler(setSuggestions);
    }

    const cancelSearchHandler = () => {
        searchInput.current.value = '';
        setSuggestions([]);
    }

    return (
        <div className="search-container">
            <h1 className="page-title">Explore shows</h1>
            <div className="search-show-bar">
                <div className="input-wrapper">
                    <input ref={searchInput} onChange={getSearchSuggestions} className="search-show-input"/>
                    {
                        suggestions.length > 0 && 
                        <div className="search-icon-wrapper" onClick={cancelSearchHandler}>
                            <i className="fas fa-times search-cross"></i>
                        </div>
                    }
                    <div className="search-icon-wrapper" onClick={getSearchResults}>
                        <i className="fas fa-search search-btn"></i>
                    </div>
                </div>
                <div className="search-suggestions">
                    {
                        [...suggestions].map((s, index) => <ShowSearchSuggestion show={s} key={index}/>)
                    }
                </div>
            </div>
            <div className="results-container">
                <div className="loader-wrapper">
                    {isLoading && <SyncLoader color={'gray'} size={50} />}
                    {results && !isLoading && results.map((show, index) => <TopMovie movie={show.show} key={index}/>)}
                </div>
            </div>
        </div>
    )
}

export default ShowSearch;