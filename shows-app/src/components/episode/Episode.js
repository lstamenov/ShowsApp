import './Episode.css';

const Episode = (props) => {
    
    const getSummary = () => {
        const regex = /<[^>]*>/g;
        const newSummary = String(props.episode.summary).replace(regex, '');
        return newSummary;
    }

    return (
        <div className="ep-wrapper">
            <div className="episode-container">
                <img className="episode-poster" alt="poster" src={props.episode.image ? props.episode.image.original : ""}></img>
                <div className="episode-details">
                    <h2 className="episode-title">{props.episode.name}</h2>
                    <h3 className="episode-detail">Premier date: <span>{props.episode.airdate}</span></h3>
                    <h3 className="episode-detail">Number: <span>{props.episode.number}</span></h3>
                    <h3 className="episode-detail">Runtime: <span>{props.episode.runtime} minutes</span></h3>
                    <h3 className="episode-detail">Rating: <span>{props.episode.rating.average}/10</span></h3>
                </div>
            </div>
            <div className="summary-container">
                <h3 className="summary-title">Summary</h3>
                <p className="episode-summary">{getSummary()}</p>
            </div>
        </div>
    )
}

export default Episode;