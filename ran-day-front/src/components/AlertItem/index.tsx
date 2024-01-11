import './index.css'
import { BsX } from "react-icons/bs"
import { Alert } from '../../contexts/AlertContextProvider'
import { useAlertContext } from "../../contexts/AlertContextProvider"


const AlertItem: React.FC<Alert> = ({type, message, layout}) => {

  const {setAlert} = useAlertContext();
  
  const alertDisplay = 
  type === 'Error' ? 'error-display' :
  type === 'Success' ? 'success-display' :
  '';

  const alertLayout = 
  type === 'Default' ? 'default-layout' :
  type === 'Guest' ? 'guest-layout' :
  '';

  return (
    <div 
      className={`
        alert
        ${alertDisplay}
        ${alertLayout}
      `}
    >
      <span>{ message }</span>
      <button 
        onClick={() => setAlert({ 
          type:'', 
          message:'' , 
          layout:''
        })}
      >
        <BsX className="close-icon"/>
      </button>
    </div>
  )
}

export default AlertItem