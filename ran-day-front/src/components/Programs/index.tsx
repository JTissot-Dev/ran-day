import './index.css'
import { useEffect, useState } from "react"
import { createPortal } from 'react-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Program } from "../../contexts/ProgramContextProvider"
import axiosClient from "../../axiosClient"
import { useAlertContext } from "../../contexts/AlertContextProvider"
import ProgramCard from "../cards/ProgramCard"


interface ProgramsProps {
  type: string,
  page: number,
  setLastPage: React.Dispatch<React.SetStateAction<number>>
}


const Programs: React.FC<ProgramsProps> = ({type, page, setLastPage}) => {

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyProgramsInfo, setEmptyProgramsInfo] = useState<string>('');
  const {setAlert} = useAlertContext();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/program?type=${type}`)
    .then(({data}) => {
      if (data.data.length === 0) {
        setEmptyProgramsInfo("Vous n'avez encore ajouté aucun programme à cette section.");
      }
      setPrograms(data.data);
      setLastPage(data.meta.last_page);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      setAlert({
        type: 'Error',
        message: 'Une erreur est survenue, veuillez actualiser la page.',
        layout: 'Default'
      })
    })
  }, [])

  useEffect(() => {
    axiosClient.get(`/program?type=${type}&page=${page}`)
    .then(({data}) => {
      setPrograms(data.data)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    })
    .catch(() => {
      setAlert({
        type: 'Error',
        message: 'Une erreur est survenue, veuillez actualiser la page.',
        layout: 'Default'
      })
    })
  }, [page])

  return (
    <div className="programs-grid">
      {
        loading &&
        createPortal(
          <div className="loading-container">
          <CircularProgress />
        </div>,
        document.body
        )
      }
      {
        programs.length > 0 ?
          programs.map((program: Program) => {
            return (
              <ProgramCard 
                key={program.id} 
                program={program} 
              />
            )
          }) :
          <p>{ emptyProgramsInfo }</p>
      }
    </div>
  )
}

export default Programs;