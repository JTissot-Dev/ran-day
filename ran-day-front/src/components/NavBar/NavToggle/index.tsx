import './index.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion} from 'framer-motion'
import { ChildProps } from '../../Header'


const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#3b3b3c"
    strokeLinecap="round"
    {...props}
  />
);

const NavToggle: React.FC<ChildProps> = ({ toggle, isOpen, setBackgroundHide }) => {

  const currentView = useLocation();

  const handleToggle = (): void => {
    if (isOpen) {
      toggle(false);
      setBackgroundHide(false);
    } else {
      toggle(true);
      setBackgroundHide(true);
    }
  }

  useEffect(() => {
    if (isOpen) {
      toggle(false);
      setBackgroundHide(false);
    }
  }, [currentView])

  return (
    <motion.button 
      className="btn-nav-toggle"
      onClick={handleToggle}
      animate={isOpen ? "open" : "closed"}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </motion.button>
  )
};

export default NavToggle