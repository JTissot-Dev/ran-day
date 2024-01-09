import './index.css'
import { ReactNode, MouseEventHandler } from "react"

interface Props {
  children: ReactNode,
  action?: MouseEventHandler<HTMLButtonElement>,
  type: "button" | "submit"
}

const BasicButton: React.FC<Props> = ({children, action, type}) => {


  return (
    <button
      type={ type }
      className="btn-basic"
      onClick={ action }
    >
      { children }
    </button>
  )
}

export default BasicButton