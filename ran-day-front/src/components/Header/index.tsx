import './index.css'
import { ReactElement } from 'react'
import { motion, useCycle } from "framer-motion"
import { BsPersonCircle } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"
import BrandIcon from '../icons/BrandIcon'
import HeaderButton from '../buttons/HeaderButton'
import HeaderSmallButton from '../buttons/HeaderSmallButton'
import useDimensions, { Dimensions } from '../../hooks/useDimension'
import NavToggle from '../NavBar/NavToggle'


const Header: React.FC = () => {

  const screenSize: Dimensions = useDimensions();
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  console.log(isOpen);

  const headerButton: ReactElement = screenSize.width < 700 ?
        <HeaderSmallButton 
          icon={ 
            <BsFillPersonFill className="icon-btn-h"/> 
          }
        /> :
        <HeaderButton 
          icon = { 
            <BsPersonCircle className="icon-btn-h" /> 
        } 
        >
          Se connecter
        </HeaderButton>
        
  return (
    <header className="header h-base">
      <BrandIcon />
      <div className="header-util">
        { headerButton }
        <NavToggle 
          toggle={() => toggleOpen()} 
          isOpen={ isOpen }
        />
      </div>
    </header>
  )
}

export default Header