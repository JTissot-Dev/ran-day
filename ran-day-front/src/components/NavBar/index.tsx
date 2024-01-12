import './index.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useOutsideClick from '../../hooks/useOutsideClick'
import { ChildProps } from '../Header'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { BsHeart } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";

const NavBar: React.FC<ChildProps> = ({isOpen, toggle, setBackgroundHide }) => {

  const { currentUser } = useAuthContext();

  const clickOutside = useOutsideClick(() => {
    if (isOpen) {
      setTimeout(() => {
        toggle(false);
        setBackgroundHide(false);
      }, 10)
    }
  });

  return (
    <motion.nav 
      ref={ clickOutside }
      className="nav-bar"
      initial={{translateX: 300}}
      animate={
        isOpen ?
        {translateX: 0} :
        {translateX: 300}
      }
      transition={{
        delay: 0.2,
        damping: 0
      }}
    >
      {
        !currentUser.token ?
        <div className="off-line">
          <p><Link to="/login">Connectez-vous</Link> pour acceder à l'ensemble des fonctionnalités.</p>
        </div> :
        <ul className="nav-list">
          <li>
            <Link 
              className="nav-link"
              to="/"
            >
              <BsBoxArrowRight />
              <span>Se déconnecter</span>
            </Link>
          </li>
          <li>
            <Link 
              className="nav-link"
              to="/"
            >
              <BsHeart />
              <span>Mes favoris</span>
            </Link>
          </li>
          <li>
            <Link 
              className="nav-link"
              to="/"
            >
              <BsBookmark />
              <span>Enregistrés</span>
            </Link>
          </li>
        </ul>
      }
    </motion.nav>
  )
}

export default NavBar