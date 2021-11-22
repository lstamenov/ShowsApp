import './ShowSearch.css';
import { useState, useRef } from 'react';
import axios from 'axios';

const ShowSearch = () => {
    const [results, setResults] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const searchInput = useRef(null);

    const searchHandler = async (setResult) => {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput.current.value}`)
        await setResult(await res.data);
    }

    const getSearchSuggestions = () => {
        searchHandler(setSuggestions);
    }

    const suggestionOnClickHandler = (e) => {
        searchInput.current.value = e.currentTarget.textContent;
    }

    return (
        <div className="search-container">
            <h1 className="page-title">Explore shows</h1>
            <div className="search-show-bar">
                <div className="input-wrapper">
                    <input ref={searchInput} onChange={getSearchSuggestions} className="search-show-input"/>
                    <div className="search-btn-wrapper" onClick={() => searchHandler(setResults)}>
                        <i className="fas fa-search search-btn"></i>
                    </div>
                </div>
                <div className="search-suggestions">
                    {
                        [...suggestions].map(s => <p className="suggestion" onClick={suggestionOnClickHandler}>{s.show.name}</p>)
                    }
                </div>
            </div>
            <div className="results-container">

            </div>
        </div>
    )
}

export default ShowSearch;