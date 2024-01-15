import './index.css'
import { Coordinates } from "../../../views/Program"
import { BsGeo } from "react-icons/bs";


interface ActivityCardProps {
  type: string,
  name: string
  coordinates: Coordinates
}

const activityDescription: any = {
  coffee: "Rien de tel qu'un bon café pour bien démarrer la journée.",
  attraction: "Vous allez aimer jouer les touristes !",
  restaurant: "Une bonne adresse pour se régaler.",
  museum: "Une visite culturelle pour enrichir votre journée.",
  bar: "Un petit verre pour se détendre, consommez avec modération.",
  park: "Un peu de verdure pour se ressourcer.",
  cinema: "Un petit film pour se divertir.",
  amusementArcade: "Un peu de fun pour se défouler.",
  iceCream: "Une petite pause gourmande.",
  natureReserve: "Connectez-vous à la nature.",
  viewPoint: "Un point de vue à couper le souffle.",
  bathingArea: "Un petit plongeon pour se rafraîchir.",
  beachResort: "Un peu de sable fin pour se détendre.",
  casino: "N'y jouez pas votre chemise !",
  fastFood: "Mettez de côté vos bonnes résolutions.",
  pub: "Un petit verre pour se détendre, consommez avec modération.",
  nightclub: "Venez enflammer le dancefloor !",
  artwork: "Une petite pause culturelle.",
}


const ActivityCard: React.FC<ActivityCardProps> = ({
  type, 
  name, 
  coordinates}) => {
    

  return (
    <article className='activity-container'>
      <img 
        className='activity-img'
        src={`/img/activity-${type}.jpg`} 
        alt="activity-img" 
      />
      <div className='activity-detail'>
        <div>
          <h2>{ name }</h2>
          <p>{ activityDescription[type] }</p>
        </div>
        <div>
          <a 
            href={`https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`}
            target="_blank"
          >
          <BsGeo className="geo-icon"/>
          <span>Voir sur Maps</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export default ActivityCard