import './Actor.css';
import defaultImageFemale from '../no-photo-female.jpg';
import defaultImageMale from '../no-photo-male.jpg';

const Actor = (props) => {
    return (
        <div className="actor-container">
            <img className="actor-image" src={props.actor.person.image ? props.actor.person.image.original : props.actor.person.gender === 'Male' ? defaultImageMale : defaultImageFemale} alt="portrait"></img>
            <div className="actor-details">
                <h2 className="actor-name">{props.actor.person.name}</h2>
                <h3 className="character-name">as {props.actor.character.name}</h3>
            </div>
        </div>
    )
}

export default Actor;