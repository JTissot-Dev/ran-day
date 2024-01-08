import './index.css'
import { ReactElement, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCycle, scroll } from "framer-motion"
import { BsPersonCircle } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"
import BrandIcon from '../icons/BrandIcon'
import HeaderButton from '../buttons/HeaderButton'
import { Cycle } from 'framer-motion'
import HeaderSmallButton from '../buttons/HeaderSmallButton'
import useDimensions, { Dimensions } from '../../hooks/useDimension'
import NavToggle from '../NavBar/NavToggle'
import NavBar from '../NavBar'


interface Props {
  setBackgroundHide: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChildProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean,
  setBackgroundHide: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({setBackgroundHide}) => {

  const screenSize: Dimensions = useDimensions();
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);


  scroll((progress: number) => {
    if (progress > 0 && headerRef.current) {
      headerRef.current.classList.add('header-scroll');
    } else {
      if (headerRef.current && headerRef.current.classList.contains('header-scroll')) {
        headerRef.current.classList.remove('header-scroll');
      }
    }
  })

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
    <header 
      ref={ headerRef }
      className="header h-base"
    >
      <BrandIcon />
      <div className="header-util">
        { 
          headerButton 
        }
        {
          createPortal(
            <NavToggle
              toggle={toggleOpen} 
              isOpen={ isOpen }
              setBackgroundHide={ setBackgroundHide }
            />,
            document.body
          )
        }
      </div>
      {
        isOpen &&
          createPortal(
            <NavBar 
              isOpen={ isOpen }
              toggle={toggleOpen}
              setBackgroundHide={ setBackgroundHide }
            />,
            document.body
          )

      }
    </header>
  )
}

export default Header