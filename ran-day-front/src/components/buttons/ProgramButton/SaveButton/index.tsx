import './index.css';
import { BsBookmark } from "react-icons/bs";


const SaveButton = () => {
  return (
    <button className="save-button">
      <BsBookmark className="save-icon"/>
      <span>Enregistrer</span>
    </button>
  )
}

export default SaveButton;