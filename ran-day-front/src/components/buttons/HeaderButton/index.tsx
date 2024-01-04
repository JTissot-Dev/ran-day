import './index.css'
import { ReactElement, ReactNode } from "react"

interface Props {
  icon: ReactElement,
  children: ReactNode
}

const HeaderButton: React.FC<Props> = ({icon, children}) => {
  return (
    <button className="btn-header">
        { icon }
      <span>
        { children }
      </span>
    </button>
  )
}

export default HeaderButton