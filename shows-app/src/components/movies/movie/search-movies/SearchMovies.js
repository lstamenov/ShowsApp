import axios from "axios";
import { useRef, useState } from "react";

const SearchMovies = () => {
    const API_KEY = '9467dada6c562150e0606a619c9ba8ff';
    const searchInput = useRef();
    const [suggestions, setSuggestions] = useState([]);

    const throttle = (func, delay) => {
        let last = 0;
        return () => {
            const now = new Date().getTime();
            if(now - last < delay){
                return;
            }
            last = now;
            return func();
        }
    }

    const fetchMovies = () => {
        if(searchInput.current.value){
            axios.get(` https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.current.value}&language=en-US&page=1&include_adult=false`)
            .then(res => setSuggestions(res.data.results))
            .catch(err => console.error(err));
        }else{
            setSuggestions([]);
        }
    }

    console.log(suggestions);

    return (
        <div className="search-container">
            <h1 className="page-title">Search movies</h1>
            <div className="search-show-bar">
                <div className="input-wrapper">
                    <input ref={searchInput} onChange={throttle(fetchMovies, 1500)} className="search-show-input"/>
                    {
                        suggestions.length > 0 && 
                        <div className="search-icon-wrapper">
                            <i className="fas fa-times search-cross"></i>
                        </div>
                    }
                    <div className="search-icon-wrapper">
                        <i className="fas fa-search search-btn"></i>
                    </div>
                </div>
                <div className="search-suggestions">
                    {
                        //[...suggestions].map((s, index) => <ShowSearchSuggestion show={s} key={index}/>)
                    }
                </div>
            </div>
            <div className="results-container">
                <div className="loader-wrapper">
                    {/* {//isLoading && <SyncLoader color={'gray'} size={50} />}
                    {results && !isLoading && results.map((show, index) => <TopMovie movie={show.show} key={index}/>)} */}
                </div>
            </div>
        </div>
    )
}

export default SearchMovies;