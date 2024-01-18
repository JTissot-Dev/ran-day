import './index.css'
import { useProgramContext } from "../../contexts/ProgramContextProvider"
import ActivityCard from "../../components/cards/ActivityCard"
import SearchForm from '../../components/SearchForm'
import { 
  BsGeoAlt,
  BsCalendar4Event,
  BsSliders2Vertical } from "react-icons/bs"
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

  const {program} = useProgramContext();
  const screenSize: Dimensions = useDimensions();
  const dateFormated: String | undefined = program.date?.format("DD/MM/YYYY");

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
              <span>{ dateFormated }</span>
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
                  
                  if (Object.keys(activity.data).length > 0) {

                    const latitude: number = activity.data.lat ? 
                      activity.data.lat : 
                      activity.data.center.lat;
                    
                    const longitude: number = activity.data.lon ? 
                    activity.data.lon : 
                    activity.data.center.lon;

                    return (
                      <ActivityCard 
                        key={activity.data.id}
                        type={activity.type}
                        name={
                          activity.data.tags.name ?
                          activity.data.tags.name :
                          "Lieu mistère"
                        }
                        coordinates={
                          {
                            latitude: latitude,
                            longitude: longitude
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