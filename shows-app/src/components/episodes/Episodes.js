import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Episode from "../episode/Episode";
import './Episodes.css';
import defaultImage from '../no-image.jpg';

const Episodes = () => {
    // const showId = useLocation().pathname.split('/')[2];
    const seasonId = useLocation().pathname.split('/')[2];
    // const [show, setShow] = useState();
    // const [seasons, setSeasons] = useState();
    const [episodes, setEpisodes] = useState();
    const [season, setSeason] = useState();

    const getSeason = async () => {
        const response = await axios.get(`https://api.tvmaze.com/seasons/${seasonId}`);
        const data = await response.data;
        return data;
    }

    useEffect(() => {
        getSeason()
        .then(data => setSeason(data))
        .catch(err => console.error(err));
    }, []);

    // useEffect(() => {
    //     axios.get(`https://api.tvmaze.com/shows/${showId}`)
    //     .then(res => setShow(res.data))
    //     .catch(err => console.error(err));
    // }, []);

    // useEffect(() => {
    //     if(show){
    //         axios.get(`https://api.tvmaze.com/shows/${show.id}/seasons`)
    //         .then(res => setSeasons(res.data))
    //         .catch(err => console.error(err));
    //     }
    // }, [show]);

    useEffect(() => {
            axios.get(`https://api.tvmaze.com/seasons/${seasonId}/episodes`)
            .then(res => setEpisodes(res.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="season-overview-container">
            { episodes && season &&
            <div>
                <img src={season.image ? season.image.original : defaultImage} alt="poster" className="season-overview-poster"></img>
                <h1 className="season-overview-title">Season <span className="season-span">{season.number}</span></h1>
                {episodes.map(episode => <Episode key={episode.id} episode={episode}/>)}
            </div>}
        </div>
    )
}

export default Episodes;