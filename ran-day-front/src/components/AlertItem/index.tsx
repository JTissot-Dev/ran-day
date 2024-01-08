import './index.css'
import { BsX } from "react-icons/bs"
import { Alert } from '../../contexts/AlertContextProvider'
import { useAlertContext } from "../../contexts/AlertContextProvider"

const AlertItem: React.FC<Alert> = ({type, message}) => {

  const {setAlert} = useAlertContext();
  
  const alertDisplay = 
  type === 'Error' ? 'error-display' :
  type === 'Success' ? 'success-display' :
  '';

  return (
    <div 
      className={`
        alert
        ${alertDisplay}
      `}
    >
      <span>{ message }</span>
      <button 
        onClick={() => setAlert({ type:'', message:'' })}
      >
        <BsX className="close-icon"/>
      </button>
    </div>
  )
}

export default AlertItem