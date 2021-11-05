import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Episode from "../episode/Episode";
import './Episodes.css';

const Episodes = () => {
    const showId = useLocation().pathname.split('/')[2];
    const seasonNumber = useLocation().pathname.split('/')[4];
    const [show, setShow] = useState();
    const [seasons, setSeasons] = useState();
    const [episodes, setEpisodes] = useState();
    const [season, setSeason] = useState();

    const getSeasonId = () => {
        for(let i = 0; i < [...seasons].length; i++){
            if(seasons[i].number == seasonNumber){
                setSeason(seasons[i]);
                return seasons[i].id;
            }
        }
    }

    useEffect(() => {
        axios.get(`https://api.tvmaze.com/shows/${showId}`)
        .then(res => setShow(res.data))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if(show){
            axios.get(`https://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => setSeasons(res.data))
            .catch(err => console.error(err));
        }
    }, [show]);

    useEffect(() => {
        if(seasons){
            const seasonId = getSeasonId();
            axios.get(`https://api.tvmaze.com/seasons/${seasonId}/episodes`)
            .then(res => setEpisodes(res.data))
            .catch(err => console.error(err));
        }
    }, [seasons]);

    console.log(episodes);
    console.log(season);

    return (
        <div className="season-overview-container">
            {show && season && episodes && 
            <div>
                <img src={season.image.original} alt="poster" className="season-overview-poster"></img>
                <h1 className="season-overview-title"><span className="season-span">{show.name}</span> Season {season.number}</h1>
                {episodes.map(episode => <Episode key={episode.id} episode={episode}/>)}
            </div>}
        </div>
    )
}

export default Episodes;