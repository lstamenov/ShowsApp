import './ShowRecommendation.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowRecommendation = ({show, styles}) => {
    const [tvMazeId, setTvMazeId] = useState();

    const getTvMazeShowId = async () => {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${show.name}`);
        const data = await res.data;
        data.forEach(el => {
            if(el.show.name == show.name){
                setTvMazeId(el.show.id);
            }
        })
    }


    useEffect(() => {
        getTvMazeShowId();
    }, []);

    return (
        <div className={styles}>
            <img className="show-recommendation-poster" src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}></img>
            <h5 className="show-recommendation-name">{show.name}</h5>
            <Link to={`/shows/${tvMazeId}`}>
                <button className="show-movie-recommended">Show more</button>
            </Link>
        </div>
    )
}

export default ShowRecommendation;