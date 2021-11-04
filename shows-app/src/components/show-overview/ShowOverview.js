import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Season from "../season/Season";
import './ShowOverview.css';

const ShowOverview = () => {
    const path = useLocation().pathname.split('/')[2];
    const [show, setShow] = useState();
    const [seasons, setSeasons] = useState();

    useEffect(() => {
        axios.get(`https://api.tvmaze.com/shows/${path}`)
        .then(res => setShow(res.data))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if(show){
            axios.get(`https://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => setSeasons(res.data))
            .catch(err => console.error(err));
        }
    }, [show])

    const getSummary = () => {
        const regex = /<[^>]*>/g;
        const newSummary = String(show.summary).replace(regex, '');
        return newSummary;
    }

    const getGenres = () => {
        let genresString = '';
        show.genres.forEach((genre, index) => index !== 0 ? genresString += `, ${genre}` : genresString += ` ${genre}`);
        return genresString;
    }


    console.log(seasons);

    return (
        <div>
            {show && <div  className="container">
                <div className="show-container">
                    <div><img className="show-poster" src={show.image.original}></img></div>
                    <div className="show-details">
                        <h2 className="show-title">{show.name}</h2>
                        <h3 className="show-detail">Genres: <span>{getGenres()}</span></h3>
                        <h3 className="show-detail">Language: <span>{show.language}</span></h3>
                        <h3 className="show-detail">Year: <span>{String(show.premiered).substring(0, 4)}</span></h3>
                        <h3 className="show-detail">Country: <span>{show.network.country.name}</span></h3>
                        <h3 className="show-detail">Rating: <span>{show.rating.average}/10</span></h3>
                        <h3 className="show-detail">Average runtime: <span>{show.averageRuntime} minutes</span></h3>
                        <h3 className="show-detail">Official site: <a href={show.officialSite} target="_blank">{show.officialSite}</a></h3>
                    </div>
                </div>
                <div className="show-full-summary">
                    <h2>Summary</h2>
                    <h3>{getSummary()}</h3>
                </div>
                {seasons && 
                    <div>
                        <h2 className="show-seasons">Seasons</h2>
                        {seasons.map(season => <Season key={season.id} showId={show.id} season={season}/>)}
                    </div>
                }
            </div>
                }
        </div>
    )
}

export default ShowOverview;