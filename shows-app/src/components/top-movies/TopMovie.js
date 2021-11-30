import { useHistory } from 'react-router';
import './TopMovie.css';
import defaultImage from '../no-image.jpg';

const TopMoive = (props) => {
    const history = useHistory();
    
    const getSummary = () => {
        const regex = /<[^>]*>/g;
        const newSummary = String(props.movie.summary).replace(regex, '').substring(0, 200) + '...';
        return newSummary;
    }

    const getGenres = () => {
        let genresString = 'Genres: ';
        if(!props.movie.genres){
            return genresString;
        } 
        props.movie.genres.forEach((genre, index) => index !== 0 ? genresString += `, ${genre}` : genresString += ` ${genre}`);
        return genresString;
    }

    const showMoreHandler = () => {
        history.push(`/shows/${props.movie.id}`);
    }


    return(
        <div className="top-movie">
            <img className="top-movie-poster" alt="poster" src={props.movie.image ? props.movie.image.original : defaultImage}></img>
            <div className="details">
                <h1 className="top-movie-title">{props.movie.name}</h1>
                <h1 className="genres">{getGenres()}</h1>
                <h1 className="summary">{getSummary()}</h1>
                <button onClick={showMoreHandler} className="show-more-btn">Show more</button>
            </div>
        </div>
    )
}

export default TopMoive;