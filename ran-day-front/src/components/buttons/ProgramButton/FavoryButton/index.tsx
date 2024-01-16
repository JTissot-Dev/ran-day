import './index.css';
import { BsHeart } from "react-icons/bs";


const FavoryButton = () => {
  return (
    <button className="favory-button">
      <BsHeart className="favory-icon"/>
      <span >Ajouter aux favoris</span>
    </button>
  )
}

export default FavoryButton;