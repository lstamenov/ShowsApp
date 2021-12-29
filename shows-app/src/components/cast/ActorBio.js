import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import defaultImageFemale from '../no-photo-female.jpg';
import defaultImageMale from '../no-photo-male.jpg';
import './ActorBio.css';
import '../recommended/shows/ShowRecommendation';
import KnownForMovie from "../movies-known-for/KnownForMovie";

const ActorBio = () => {
    const location = useLocation();
    const tvMazeActorId = location.pathname.split('/')[2];
    const [theTvDbActors, setTheTvDbActors] = useState();
    const [theTvDbActor, setTheTvDbActor] = useState();
    const [tvMazeActor, setTvMazeActor] = useState();
    const [actor, setActor] = useState();
    const API_KEY = '9467dada6c562150e0606a619c9ba8ff';

    useLayoutEffect(() => {
        axios.get(`https://api.tvmaze.com/people/${tvMazeActorId}`)
        .then(res => setTvMazeActor(res.data))
        .catch(err => console.error(err));
    }, [tvMazeActorId]);

    useLayoutEffect(() => {
        if(tvMazeActor){
            axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${tvMazeActor.name}`)
            .then(res => setTheTvDbActors(res.data.results))
            .catch(err => console.error(err));
        }
    }, [tvMazeActor]);

    useLayoutEffect(() => {
        if(theTvDbActors){
            [...theTvDbActors].forEach(actor => {
                if(actor.name === tvMazeActor.name){
                    setTheTvDbActor(actor);
                }
            })
        }
    }, [theTvDbActors]);

    useLayoutEffect(() => {
        if(theTvDbActor){
            axios.get(`https://api.themoviedb.org/3/person/${theTvDbActor.id}?api_key=${API_KEY}&language=en-US`)
            .then(res => setActor(res.data))
            .catch(err => console.error(err));
        }
    }, [theTvDbActor]);

    console.log(theTvDbActor);

    return(
        <div className="actor-bio-container">
            {
                tvMazeActor && theTvDbActor && actor &&
                <>
                <div className="actor-details-container">
                    <img className="actor-big-image" alt="actor-poster" src={tvMazeActor.image ? tvMazeActor.image.original : tvMazeActor.gender === 'Male' ? defaultImageMale : defaultImageFemale}></img>
                    <div className="actor-about-container">
                        <h2 className="actor-bio-name">{actor.name}</h2>
                        <div className="actor-bio-main">
                            <h4 className="actor-bio-detail">Born: <span>{actor.birthday}</span></h4>
                            <h4 className="actor-bio-detail">Place of birth: <span>{actor.place_of_birth}</span></h4>
                        </div>
                        <h6 className="actor-bio-biography-title">Biography</h6>
                        <p className="actor-bio-biography">{actor.biography}</p>
                    </div>
                </div>
                <div className="known-for-movies-container">
                    <h2 className="known-for-movies-title">Known for:</h2>
                    {
                        theTvDbActor && theTvDbActor.known_for.map((movie, index) => <KnownForMovie movie={movie} key={index}/>)
                    }
                </div>
                </>
            }
        </div>
    )
}

export default ActorBio;