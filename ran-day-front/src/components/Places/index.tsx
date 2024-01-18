import './index.css'
import PlaceCard from '../cards/PlaceCard'


export interface placesProps {
  getProgram: Function
}

export interface Place {
  title: string
  imgPath: string
}

const places: Place[] = [
  {
    title: "Lyon",
    imgPath: "/img/place-lyon.jpg"
  },
  {
    title: "Paris",
    imgPath: "/img/place-paris.jpg"
  },
  {
    title: "Saint-Malo",
    imgPath: "/img/place-saint-malo.jpg"
  },
  {
    title: "Bordeaux",
    imgPath: "/img/place-bordeaux.jpg"
  },
  {
    title: "Strasbourg",
    imgPath: "/img/place-strasbourg.jpg"
  }
]

const Places: React.FC<placesProps> = ({getProgram}) => {
  return (
    <div>
      <h2 className="places-title">Destinations en un click</h2>
      <div className="grid-places">
        {
          places.map((place, index) => {
            return (
              <PlaceCard 
                key={ index }
                title={ place.title }
                imgPath={ place.imgPath }
                getProgram={ getProgram }
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Places