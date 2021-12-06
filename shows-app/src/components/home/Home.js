import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import TopMoive from '../top-movies/TopMovie';

const Home = () => {
    const [movies, setMovies] = useState();

    const fetchShowsDataHandler = async () => {
        const response = await axios.get('https://api.tvmaze.com/shows');
        const allMovies = await response.data;
        setMovies(allMovies.filter((element, index) => index >= 20 && index < 40));
    }

    useEffect(() => {
        fetchShowsDataHandler();
    }, []);

    return (
        <div className="home">
            <h1 className="title">Top 20 Weekly suggestions</h1>
            <div className="weekly-movies">
                {movies && movies.map((movie, index) => <TopMoive key={index} movie={movie}/>)}
            </div>
        </div>
    )
}

export default Home;