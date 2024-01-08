import './index.css'
import { motion } from 'framer-motion'
import useOutsideClick from '../../hooks/useOutsideClick'
import { ChildProps } from '../Header'


const NavBar: React.FC<ChildProps> = ({isOpen, toggle, setBackgroundHide }) => {

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

    </motion.nav>
  )
}

export default NavBar