import './index.css'
import { ReactElement, ReactNode } from "react"
import { useNavigate } from 'react-router-dom'


export interface Props {
  icon: ReactElement,
  children: ReactNode,
  path: string
}

const LoginButton: React.FC<Props> = ({
  icon, 
  children,
  path}) => {

  const navigate = useNavigate();

  return (
    <button 
      className="btn-header"
      onClick={() => navigate(path)}
    >
        { icon }
      <span>
        { children }
      </span>
    </button>
  )
}

export default LoginButton