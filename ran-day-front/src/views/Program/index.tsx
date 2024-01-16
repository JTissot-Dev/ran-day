import './index.css'
import { useProgramContext } from "../../contexts/ProgramContextProvider"
import ActivityCard from "../../components/cards/ActivityCard"
import SearchForm from '../../components/SearchForm'
import { BsCalendar4Event } from "react-icons/bs"
import { BsGeoAlt } from "react-icons/bs"
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


const Program: React.FC = () => {

  const {programCity, programs, programDate} = useProgramContext();
  const screenSize: Dimensions = useDimensions();
  const dateFormated: String | undefined = programDate?.format("DD/MM/YYYY");

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
        programs.length > 0 && 
        <>
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
              <span>{ programCity }</span>
            </div>
            <div>
              <BsCalendar4Event className="info-date-icon"/>
              <span>{ dateFormated }</span>
            </div>
          </div>
          
          <div className="program-layout">
            <div className="program-grid">
              {
                programs.map((program: any) => {  
                  
                  if (Object.keys(program.data).length > 0) {

                    const latitude: number = program.data.lat ? 
                      program.data.lat : 
                      program.data.center.lat;
                    
                    const longitude: number = program.data.lon ? 
                    program.data.lon : 
                    program.data.center.lon;

                    return (
                      <ActivityCard 
                        key={program.data.id}
                        type={program.type}
                        name={program.data.tags.name}
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
        </>
      }
      
    </div>
  )
}

export default Program