import './index.css'
import { Outlet } from "react-router-dom"


const GuestLayout: React.FC = () => {
  return (
    <main className="guest-layout-container">
      <Outlet />
    </main>
  )
}


export default GuestLayout