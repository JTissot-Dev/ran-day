import './index.css'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { 
  Backdrop,
  CircularProgress } from '@mui/material'
import Header from "../../components/Header"
import Footer from '../../components/Footer'
import AlertItem from '../../components/AlertItem'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useProgramContext } from '../../contexts/ProgramContextProvider'
import axiosClient from '../../axiosClient'


const DefaultLayout: React.FC = () => {

  const {dispatch, currentUser} = useAuthContext();

  const {alert, setAlert} = useAlertContext();
  const {loadingProgram } = useProgramContext();
  
  const [backgroundHide, setBackgroundHide] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.token) {
      axiosClient.get('/user')
        .then(({data}) => {
          dispatch({type: "refresh", value: {
            userId: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
          }})
        })
        .catch(({response}) => {
          if (response && response.status !== 401) {
            setAlert({
              type: "Error",
              message: "Une erreur est survenue, veuillez actualiser la page.",
              layout: "Default"
            })
          }
        })
    }
  }, []);

  

  return (
    <div className='layout'>
      {
        loadingProgram &&
          createPortal(
            <Backdrop
              sx={{ 
                color: '#FDFDFF', 
                zIndex: (theme) => theme.zIndex.drawer + 1
              }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>,
            document.body
          )
      }
      {
        createPortal(
          <Header 
          setBackgroundHide={ setBackgroundHide }
        />,
        document.getElementById('root') as HTMLElement
        )
      }

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
    </div>
  )
}

export default DefaultLayout