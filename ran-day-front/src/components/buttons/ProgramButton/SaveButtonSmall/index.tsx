import './index.css';
import { BsBookmark } from "react-icons/bs";


const SaveButtonSmall = () => {
  return (
    <button className="save-button-small">
      <BsBookmark className="save-icon-small"/>
    </button>
  )
}

export default SaveButtonSmall;