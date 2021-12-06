import { useState } from "react";
import ShowRecommendation from "./ShowRecommendation";
import './ShowCarousel.css';

const ShowCarousel = ( {recommendedShows} ) => {
    const [currentShowIndex, setCurrentShowIndex] = useState(0);
    
    const rigthArrowClickHandler = () => {
        setCurrentShowIndex(currentShowIndex === recommendedShows.length - 1 ? 0 : currentShowIndex + 1);
    }

    return(
        <div className="recommended-shows-container">
            <i class="fas fa-arrow-circle-left carousel-arrow" ></i>
            {recommendedShows.map((show, index) => {
                return (
                    index === currentShowIndex && <ShowRecommendation key={index} show={show} styles={index === currentShowIndex ? 'show-recommendation active' : 'show-recommendation'}/>
                )
            })}
            <i class="fas fa-arrow-circle-right carousel-arrow" onClick={rigthArrowClickHandler}></i>
        </div>
    ) 
}

export default ShowCarousel;