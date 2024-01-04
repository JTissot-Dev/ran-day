import './index.css'
import { ReactElement } from "react"

interface Props {
  icon: ReactElement
}

const HeaderSmallButton: React.FC<Props> = ({icon}) => {
  return (
    <button className="btn-header-s">
      { icon }
    </button>
  )
}

export default HeaderSmallButton