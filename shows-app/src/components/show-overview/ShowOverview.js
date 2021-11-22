import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router";
import Actor from "../cast/Actor";
import Crew from "../crew/Crew";
import Season from "../season/Season";
import './ShowOverview.css';

const ShowOverview = () => {
    const showHideSectionReducer = (state, action) => {
        switch (action.type) {
            case 'castHandler':
                const castContainer = document.querySelector('.cast-container');
                const castButton = castContainer.nextElementSibling;
                if(!state.showCast){
                    castContainer.style.display = 'flex';
                    castButton.textContent = 'Hide cast';
                }else{
                    castContainer.style.display = 'none';
                    castButton.textContent = 'Show cast';
                }
                return {showCast: !state.showCast, showCrew: state.showCrew};
            case 'crewHandler':
                const crewContainer = document.querySelector('.crew-container');
                const crewButton = crewContainer.nextElementSibling;
                if(!state.showCrew){
                    crewContainer.style.display = 'flex';
                    crewButton.textContent = 'Hide crew';
                }else{
                    crewContainer.style.display = 'none';
                    crewButton.textContent = 'Show crew';
                }
                return {showCast: state.showCast, showCrew: !state.showCrew};
            default:
                break;
        }
    }

    const path = useLocation().pathname.split('/')[2];
    const [show, setShow] = useState();
    const [seasons, setSeasons] = useState();
    const [cast, setCast] = useState();
    const [crew, setCrew] = useState();
    const [showHideState, dispatch] = useReducer(showHideSectionReducer, {showCast: false, showCrew: false});


    console.log(crew);

    const fetchShowDataHandler = () => {
        axios.get(`https://api.tvmaze.com/shows/${path}`)
        .then(res => setShow(res.data))
        .catch(err => console.error(err));
    }

    const fetchCastDataHandler = () => {
        axios.get(`https://api.tvmaze.com/shows/${path}/cast`)
        .then(res => setCast(res.data))
        .catch(err => console.error(err));
    }

    const fetchCrewDataHandler = () => {
        axios.get(`https://api.tvmaze.com/shows/${path}/crew`)
        .then(res => setCrew(res.data))
        .catch(err => console.error(err));
    }

    const fetchSeasonsDataHandler = () => {
        if(show){
            axios.get(`https://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => setSeasons(res.data))
            .catch(err => console.error(err));
        }
    }

    useEffect(() => {
        fetchShowDataHandler();
        fetchCastDataHandler();
        fetchCrewDataHandler();
    }, [path]);

    useEffect(() => {
        fetchSeasonsDataHandler();
    }, [show]);


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

    return (
        <div>
            {show && <div  className="container">
                <div className="show-container">
                    <div><img className="show-poster" src={show.image.original} alt="poster"></img></div>
                    <div className="show-details">
                        <h2 className="show-title">{show.name}</h2>
                        <h3 className="show-detail">Genres: <span>{getGenres()}</span></h3>
                        <h3 className="show-detail">Language: <span>{show.language}</span></h3>
                        <h3 className="show-detail">Year: <span>{String(show.premiered).substring(0, 4)}</span></h3>
                        <h3 className="show-detail">Country: <span>{show.network.country.name}</span></h3>
                        <h3 className="show-detail">Rating: <span>{show.rating ? show.rating.average : "N/A"}</span></h3>
                        <h3 className="show-detail">Average runtime: <span>{show.averageRuntime} minutes</span></h3>
                        <h3 className="show-detail">Official site: <a href={show.officialSite} target="_blank">{show.officialSite}</a></h3>
                    </div>
                </div>
                <div className="show-full-summary">
                    <h2 className="show-seasons">Summary</h2>
                    <p className="short-summary">{getSummary()}</p>
                </div>
                {cast && 
                    <div className="show-more-container">
                        <h2 className="show-seasons">Cast</h2>
                        <div className="cast-container">
                            {cast.map((actor, index) => <Actor key={index} actor={actor}/>)}
                        </div>
                        <button className="show-btn" onClick={() => dispatch({type: 'castHandler'})}>Show cast</button>
                    </div>
                }
                {crew &&
                <div className="show-more-container">
                    <h2 className="show-seasons">Crew</h2>
                    <div className="crew-container">
                        {crew.map((crew, index) => <Crew key={index} crew={crew}/>)}
                    </div>
                    <button className="show-btn" onClick={() => dispatch({type: 'crewHandler'})}>Show crew</button>
                </div>
                }
                {seasons && 
                    <div className="show-more-container">
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