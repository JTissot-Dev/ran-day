import './index.css'
import { ReactElement } from "react"
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: ReactElement,
}

const HeaderSmallButton: React.FC<Props> = ({icon}) => {

  const navigate = useNavigate();

  return (
    <button 
      className="btn-header-s"
      onClick={() => navigate("/login")}
    >
      { icon }
    </button>
  )
}

export default HeaderSmallButton