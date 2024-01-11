import './index.css'
import { Outlet } from "react-router-dom"
import { useAlertContext } from "../../contexts/AlertContextProvider"
import AlertItem from '../../components/AlertItem'


const GuestLayout: React.FC = () => {

  const {alert} = useAlertContext();  

  return (
    <main className="guest-layout-container">
      {
        alert.message &&
          <AlertItem
            type={alert.type} 
            message={alert.message} 
            layout={alert.layout}
          />
      }
      <Outlet />
    </main>
  )
}


export default GuestLayout