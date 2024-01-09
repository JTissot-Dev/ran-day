import './index.css'
import { ReactElement, ReactNode } from "react"
import { useNavigate } from 'react-router-dom'


interface Props {
  icon: ReactElement,
  children: ReactNode,
}

const HeaderButton: React.FC<Props> = ({icon, children}) => {

  const navigate = useNavigate();

  return (
    <button 
      className="btn-header"
      onClick={() => navigate("/login")}
    >
        { icon }
      <span>
        { children }
      </span>
    </button>
  )
}

export default HeaderButton