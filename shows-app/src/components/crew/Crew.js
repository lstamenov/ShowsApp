import defaultImageFemale from '../no-photo-female.jpg';
import defaultImageMale from '../no-photo-male.jpg';
import './Crew.css';

const Crew = (props) => {  
    return(
        <div className="single-crew-container">
            <img className="crew-image" src={props.crew.person.image ? props.crew.person.image.original : props.crew.person.gender === 'Male' ? defaultImageMale : defaultImageFemale} alt="person-image"></img>
            <div className="crew-details">
                <h2 className="crew-name">{props.crew.person.name}</h2>
                <h3 className="crew-type">{props.crew.type}</h3>
            </div>
        </div>
    )
}

export default Crew;