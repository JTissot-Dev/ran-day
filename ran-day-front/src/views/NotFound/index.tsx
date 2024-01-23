import './index.css'
import { PiSmileySadLight } from "react-icons/pi"

const NotFound = () => {
  return (
    <div 
      className="notfound-container"
    >
      <PiSmileySadLight 
        className="notfound-icon"
      />
      <h1 
        className="mt-5"
      > 
        The request URL was not found on this server.
      </h1>
      
    </div>
  )
}

export default NotFound;