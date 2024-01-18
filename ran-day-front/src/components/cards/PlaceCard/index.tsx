import './index.css'
import { Place } from "../../Places"


interface PlaceProps extends Place  {
  getProgram: Function
}


const PlaceCard: React.FC<PlaceProps> = ({title, imgPath, getProgram}) => {
  return (
    <article className="place-article">
      <button 
        className="btn-place"
        onClick={ () => {
          getProgram("place", title) 
        }}
      >
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