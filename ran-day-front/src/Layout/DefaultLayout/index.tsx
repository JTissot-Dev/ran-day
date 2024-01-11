import './index.css'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from "../../components/Header"
import Footer from '../../components/Footer'
import AlertItem from '../../components/AlertItem'
import { useAlertContext } from '../../contexts/AlertContextProvider'


const DefaultLayout: React.FC = () => {

  const {alert} = useAlertContext();
  const [backgroundHide, setBackgroundHide] = useState<boolean>(false);

  return (
    <>
      <Header 
        setBackgroundHide={ setBackgroundHide }
      />
      {
        alert.message &&
          <AlertItem 
            type={alert.type} 
            message={alert.message}
            layout={alert.layout}
          />
      }
      <main className="container">
        <Outlet />
      </main>
      <Footer />
      {
        backgroundHide &&
          <motion.div 
            className="bg-hide"
            initial={{ opacity: 0 }}
            animate={
              { opacity: 1 }
            }
            transition={{
              duration: 0.4,
              delay: 0,
              ease: [1, 1, 1, 1]
            }}
          >
            
          </motion.div>
      }
    </>
  )
}

export default DefaultLayout