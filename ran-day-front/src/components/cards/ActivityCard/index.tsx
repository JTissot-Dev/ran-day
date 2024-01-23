import './index.css'
import { Coordinates } from "../../../views/Program"
import { BsGeo } from "react-icons/bs";
import { PiCoffeeLight } from "react-icons/pi";
import { PiFilmSlateLight } from "react-icons/pi";
import { PiHamburgerLight } from "react-icons/pi";
import { PiIceCreamLight } from "react-icons/pi";
import { PiPlantLight } from "react-icons/pi";
import { PiMountainsLight } from "react-icons/pi";
import { PiBankLight } from "react-icons/pi";
import { PiBeerSteinLight } from "react-icons/pi";
import { PiBroomLight } from "react-icons/pi";
import { PiForkKnifeLight } from "react-icons/pi";
import { PiGameControllerLight } from "react-icons/pi";
import { PiParkLight } from "react-icons/pi";
import { PiAnchorLight } from "react-icons/pi";
import { PiBeerBottleLight } from "react-icons/pi";
import { activityDetail } from '../../../constants/activityDetail';
import { PiWavesLight } from "react-icons/pi";
import { PiCoinsLight } from "react-icons/pi";
import { PiCastleTurretLight } from "react-icons/pi";


interface ActivityCardProps {
  type: string,
  name: string
  coordinates: Coordinates
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  type, 
  name, 
  coordinates}) => {
  
  const activityIcon = type === "coffee" ? 
      <PiCoffeeLight className="activity-icon-coffee"/> :
    type === "attraction" ?
      <PiCastleTurretLight className="activity-icon" /> :
    type === "restaurant" ?
      <PiForkKnifeLight className="activity-icon" /> :
    type === "museum" ?
      <PiBankLight className="activity-icon" /> :
    type === "bar" ?
      <PiBeerSteinLight className="activity-icon" /> :
    type === "park" ?
      <PiParkLight className="activity-icon" /> :
    type === "cinema" ?
      <PiFilmSlateLight className="activity-icon" /> :
    type === "amusementArcade" ?
      <PiGameControllerLight className="activity-icon" /> :
    type === "iceCream" ?
      <PiIceCreamLight className="activity-icon" /> :
    type === "natureReserve" ?
      <PiPlantLight className="activity-icon" /> :
    type === "viewPoint" ?
      <PiMountainsLight className="activity-icon" /> :
    type === "baLightgArea" ?
      <PiWavesLight className="activity-icon" /> :
    type === "beachResort" ?
      <PiAnchorLight className="activity-icon" /> :
    type === "casino" ?
      <PiCoinsLight className="activity-icon" /> :
    type === "fastFood" ?
      <PiHamburgerLight className="activity-icon" /> :
    type === "pub" ?
      <PiBeerSteinLight className="activity-icon" /> :
    type === "nightclub" ?
      <PiBeerBottleLight className="activity-icon" /> :
    type === "artwork" &&
      <PiBroomLight className="activity-icon" />
    

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
          <div className='activity-precision'>
            { activityIcon }
            <span>{ activityDetail[type].text }</span>
          </div>
          <p>{ activityDetail[type].description }</p>
        </div>
        <div>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`}
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