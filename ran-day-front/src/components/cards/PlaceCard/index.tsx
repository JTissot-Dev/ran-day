import './index.css'
import { Place } from "../../Places"


const PlaceCard: React.FC<Place> = ({title, imgPath}) => {
  return (
    <article className="place-article">
      <button className="btn-place">
        <h3 className="place-title">{ title }</h3>
        <img 
          className="place-img"
          src={ imgPath } 
          alt="city-img" />
      </button>
    </article>
  )
}

export default PlaceCard