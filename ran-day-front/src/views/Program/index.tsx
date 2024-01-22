import './index.css'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useProgramContext } from "../../contexts/ProgramContextProvider"
import { useAlertContext } from '../../contexts/AlertContextProvider'
import ActivityCard from "../../components/cards/ActivityCard"
import SearchForm from '../../components/SearchForm'
import { 
  BsGeoAlt,
  BsCalendar4Event,
  BsSliders2Vertical } from "react-icons/bs"
import axiosClient from '../../axiosClient'
import FavoryButton from '../../components/buttons/ProgramButton/FavoryButton'
import FavoryButtonSmall from '../../components/buttons/ProgramButton/FavoryButtonSmall'
import SaveButton from '../../components/buttons/ProgramButton/SaveButton'
import SaveButtonSmall from '../../components/buttons/ProgramButton/SaveButtonSmall'
import useDimensions from '../../hooks/useDimension'
import { Dimensions } from '../../hooks/useDimension'


export interface Coordinates {
  latitude: number,
  longitude: number
}

const programThemes: any = {
  'classic-program': 'Classique',
  'culture-program': 'Culture',
  'outdoor-program': 'Nature',
  'party-program': 'Festif'
}


const Program: React.FC = () => {

  const {program, setProgram} = useProgramContext();
  const {setAlert} = useAlertContext();
  const screenSize: Dimensions = useDimensions();
  const dateFormatedTemplate: string | undefined = program.date?.format("DD/MM/YYYY");
  const dateFormatedApi: string | undefined = program.date?.format("YYYY-MM-DD");
  console.log(program)

  useEffect(() => {
    if (!program.id && (program.save || program.favorite)) {
      const activities = program.activities.filter((activity: any) => activity.id)  
      axiosClient.post('/program', {
        ...program,
        date: dateFormatedApi,
        activities: activities
      })
      .then(({data}) => {
        console.log(data)
        setProgram(prevProgram => ({
          ...prevProgram,
          id: data.data.id
        }))
      })
      .catch((error) => {
        console.log(error)
        setAlert({
          type: 'Error',
          message: 'Une erreur est survenue lors de la sauvegarde du programme.',
          layout: 'Default'
        })
      })
      return;
    }

    if (program.save || program.favorite) {
      axiosClient.put(`/program/${program.id}`, {
        ...program,
        date: dateFormatedApi
      })
      .catch(() => {
        setAlert({
          type: 'Error',
          message: 'Une erreur est survenue lors de la mise à jour du programme.',
          layout: 'Default'
        })
      })
      return;
    }

    if (program.id && (!program.save && !program.favorite)) {
      axiosClient.delete(`/program/${program.id}`)
      .then(() => {
        setProgram(prevProgram => ({
          ...prevProgram,
          id: null
        }))
      })
      .catch(() => {
        setAlert({
          type: 'Error',
          message: 'Une erreur est survenue lors de la suppression du programme.',
          layout: 'Default'
        })
      })
    }
  }, [program.save, program.favorite])


  const favoryButton = screenSize.width < 768 ?
    <FavoryButtonSmall /> :
    <FavoryButton />;

  const saveButton = screenSize.width < 768 ?
    <SaveButtonSmall /> :
    <SaveButton />;

  return (
    <div className="program-container">
      <SearchForm />
      {
        program.activities.length > 0 && 
        <div className="activities-container">
          <div className="program-head">
            <h1>Votre programme</h1>
            <div className="button-container">
              { favoryButton }
              { saveButton }
            </div>
          </div>
          <div className="program-infos">
            <div>
              <BsGeoAlt className="info-geo-icon"/>
              <span>{ program.city }</span>
            </div>
            <div>
              <BsCalendar4Event className="info-date-icon"/>
              <span>{ dateFormatedTemplate }</span>
            </div>
            <div>
              <BsSliders2Vertical className="info-theme-icon"/>
              <span>{ programThemes[program.theme] }</span>
            </div>
          </div>
          
          <div className="program-layout">
            <div className="program-grid">
              {
                program.activities.map((activity: any) => {  
                  
                  if (activity.id) {
                    return (
                      <ActivityCard 
                        key={activity.id}
                        type={activity.type}
                        name={activity.name}
                        coordinates={
                          {
                            latitude: activity.latitude,
                            longitude: activity.longitude
                          }
                        }
                      />
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Program