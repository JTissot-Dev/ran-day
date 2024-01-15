import './index.css'
import { useProgramContext } from "../../contexts/ProgramContextProvider"
import ActivityCard from "../../components/cards/ActivityCard"
import SearchForm from '../../components/SearchForm'
import { BsCalendar4Event } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";


export interface Coordinates {
  latitude: number,
  longitude: number
}


const Program: React.FC = () => {

  const {programCity, programs, programDate} = useProgramContext();

  const dateFormated: String | undefined = programDate?.format("DD/MM/YYYY");

  return (
    <div className="program-container">
      <SearchForm />
      {
        programs.length > 0 && 
        <>
          <h1>Votre programme</h1>
          <div className="program-infos">
            <div>
              <BsGeoAlt className="info-icon"/>
              <span>{ programCity }</span>
            </div>
            <div>
              <BsCalendar4Event className="info-icon"/>
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