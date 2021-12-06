import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Episode from "../episode/Episode";
import './Episodes.css';
import defaultImage from '../no-image.jpg';

const Episodes = () => {
    const seasonId = useLocation().pathname.split('/')[2];
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
                {episodes.map(episode => <Episode key={episode.id} episode={episode}/>)}
            </div>}
        </div>
    )
}

export default Episodes;