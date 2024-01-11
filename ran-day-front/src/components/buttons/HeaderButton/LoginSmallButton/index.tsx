import './index.css'
import { ReactElement } from "react"
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: ReactElement,
  path: string 
}

const LoginSmallButton: React.FC<Props> = ({icon, path}) => {

  const navigate = useNavigate();

  return (
    <button 
      className="btn-header-s"
      onClick={() => navigate(path)}
    >
      { icon }
    </button>
  )
}

export default LoginSmallButton