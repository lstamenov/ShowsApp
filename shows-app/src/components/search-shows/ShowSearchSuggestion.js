import './ShowSearchSuggestion.css';
import defaultImage from '../no-image.jpg';
import { useHistory } from 'react-router';

const ShowSearchSuggestion = (props) => {
    const history = useHistory();
    
    const getShowYear = () => {
        return String(props.show.show.premiered).substring(0, 4);
    }

    const onClickHandler = () => {
        history.push(`/shows/${props.show.show.id}`);
    }

    const hasImage = props.show.show.image !== null;

    return (
        <div className="suggestion-wrapper" onClick={onClickHandler}>
            <img className="show-suggestion-poster" src={hasImage ? props.show.show.image.original : defaultImage}></img>
            <label className="show-suggestion-detail">{props.show.show.name}</label>
            <label className="show-suggestion-detail">({getShowYear()})</label>
        </div>
    )
}

export default ShowSearchSuggestion;