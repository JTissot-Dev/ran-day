import './index.css'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { BsHeart } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import useOutsideClick from '../../hooks/useOutsideClick'
import { ChildProps } from '../Header'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import axiosClient from '../../axiosClient'


const NavBar: React.FC<ChildProps> = ({isOpen, toggle, setBackgroundHide }) => {

  const { currentUser, dispatch } = useAuthContext();
  const { setAlert } = useAlertContext();
  const navigateHome = useNavigate();

  const clickOutside = useOutsideClick(() => {
    if (isOpen) {
      setTimeout(() => {
        toggle(false);
        setBackgroundHide(false);
      }, 10)
    }
  });


  const logout = (): void => {
    axiosClient.post('/logout')
    .then(() => {
      dispatch({type: 'logout'});
      toggle(false);
      setBackgroundHide(false);
      navigateHome('/index');
    })
    .catch(() => {
      toggle(false);
      setBackgroundHide(false);
      setAlert({
        type: 'Error',
        message: 'Une erreur est survenue, veuillez actualiser la page.',
        layout: 'Default'
      })
    })
  }

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
            <button 
              className="logout-button"
              onClick={ logout }
            >
              <BsBoxArrowRight />
              <span>Se déconnecter</span>
            </button>
          </li>
          <li>
            <Link 
              className="nav-link"
              to="/favory"
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