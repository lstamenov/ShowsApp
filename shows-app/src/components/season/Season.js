import './Season.css';
import {Link} from 'react-router-dom';


const Season = (props) => {
    return (
        <div className="season-container">
            <div>
                <img className="season-poster" src={props.season.image.original}></img>
            </div>
            <div className="season-details">
                <h2 className="season-number">Season {props.season.number}</h2>
                <h3 className="show-detail">Premiere date: <span>{props.season.premiereDate}</span></h3>
                <h3 className="show-detail">End date: <span>{props.season.endDate}</span></h3>
                <h3 className="show-detail">Episodes: <span>{props.season.episodeOrder}</span></h3>
                <button className="show-more-btn"><Link to={`/shows/${props.showId}/seasons/${props.season.id}/episodes`}>Show episodes</Link></button>
            </div>
        </div>
    )
}

export default Season;