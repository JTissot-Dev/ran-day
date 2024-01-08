import './index.css'
import PlaceCard from '../cards/PlaceCard'

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
    title: "Singapour",
    imgPath: "/img/place-singapour.jpg"
  },
  {
    title: "Londre",
    imgPath: "/img/place-london.jpg"
  },
  {
    title: "Bruxelles",
    imgPath: "/img/place-bruxelles.jpg"
  },
  {
    title: "Strasbourg",
    imgPath: "/img/place-strasbourg.jpg"
  }
]

const Places: React.FC = () => {
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
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Places