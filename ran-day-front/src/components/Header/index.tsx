import './index.css'
import { ReactElement, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { scroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs"
import { BsPersonPlusFill } from "react-icons/bs"
import BrandIcon from '../icons/BrandIcon'
import LoginButton from '../buttons/HeaderButton/LoginButton'
import LoginSmallButton from '../buttons/HeaderButton/LoginSmallButton'
import useDimensions, { Dimensions } from '../../hooks/useDimension'
import NavToggle from '../NavBar/NavToggle'
import NavBar from '../NavBar'
import AccountButton from '../buttons/HeaderButton/AccountButton'
import { useAuthContext } from '../../contexts/AuthContextProvider'


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
  const { currentUser } = useAuthContext();
  console.log(currentUser)

  scroll((progress) => {
    if (progress > 0) {
      headerRef.current?.classList.add('header-scroll');
    } else {
      if (headerRef.current?.classList.contains('header-scroll')) {
        headerRef.current?.classList.remove('header-scroll');
      }
    }
  })

  const loginButton: ReactElement = screenSize.width < 700 ?
    <LoginSmallButton 
      icon={ 
        <BsFillPersonFill className="icon-btn-h"/> 
      }
      path="/login"
    /> :
    <LoginButton 
      icon = { 
        <BsPersonCircle className="icon-btn-h" /> 
      } 
      path="/login"
    >
      Se connecter
    </LoginButton>
  
  const signupButton: ReactElement|false = screenSize.width > 700 &&
    <LoginButton
      icon={ 
        <BsPersonPlusFill className="icon-btn-h" /> 
      }
      path="/signup" 
    >
      S'inscrire
    </LoginButton>
        
  return (
    <header 
      id="header"
      ref={ headerRef }
      className="header h-base"
    >
      <Link
        to="/index"
      >
        <BrandIcon />
      </Link>
      <div className="header-util">
        {
          currentUser.token ?
            <AccountButton 
              firstName={ currentUser.user.firstName }
              lastName={ currentUser.user.lastName }
            /> :
            <>
              { loginButton }
              { signupButton }
            </>
        }

        {
          createPortal(
            <div className="toggle-container">
              <NavToggle
                toggle={toggleOpen} 
                isOpen={ isOpen }
                setBackgroundHide={ setBackgroundHide }
              />
            </div>,
            document.getElementById('root') as HTMLElement
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
            document.getElementById('root') as HTMLElement
          )

      }
    </header>
  )
}

export default Header