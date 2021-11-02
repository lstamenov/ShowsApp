import './TopMovie.css';

const TopMoive = (props) => {
    const getSummary = () => {
        const regex = /<[^>]*>/g;
        const newSummary = String(props.movie.summary).replace(regex, '').substring(0, 200) + '...';
        return newSummary;
    }

    const getGenres = () => {
        let genresString = 'Genres: ';
        props.movie.genres.forEach((genre, index) => index !== 0 ? genresString += `, ${genre}` : genresString += ` ${genre}`);
        return genresString;
    }

    return(
        <div className="top-movie">
            <img className="top-movie-poster" alt="poster" src={props.movie.image.original}></img>
            <div className="details">
                <h1 className="top-movie-title">{props.movie.name}</h1>
                <h1 className="genres">{getGenres()}</h1>
                <h1 className="summary">{getSummary()}</h1>
                <button className="show-more-btn">Show more</button>
            </div>
        </div>
    )
}

export default TopMoive;