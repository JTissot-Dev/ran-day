import './index.css'
import { useNavigate } from "react-router-dom"
import dayjs, {Dayjs} from "dayjs"
import { 
  BsCalendar4Event,
  BsSliders2Vertical } from "react-icons/bs"
import { useProgramContext } from '../../../contexts/ProgramContextProvider'
import { Program } from "../../../contexts/ProgramContextProvider"
import { programThemes } from '../../../views/Program'



interface ProgramCardProps {
  program: Program
}

const ProgramCard: React.FC<ProgramCardProps> = ({program}) => {
  
  const {setProgram} = useProgramContext();
  const navigateProgram = useNavigate();
  const dateFormatedProgram: Dayjs | null = dayjs(program.date);
  const dateFormatedTemplate: string | undefined = dateFormatedProgram?.format("DD/MM/YYYY");

  const handleNavigateProgram = () => {
    setProgram(program);
    navigateProgram(`/program/${program.id}`);
  }

  return (
    <article className='program-card-container'>
      <img 
        className='program-img'
        src={`/img/${program.theme}.jpg`} 
        alt="program-img" 
      />
      <div className='program-detail'>
        <div>
          <h2>{ program.city }</h2>
          <div className='program-precision'>
            <BsCalendar4Event 
              className='program-icon'
            />
            <span>{ dateFormatedTemplate }</span>
          </div>
          <div className='program-precision'>
          <BsSliders2Vertical 
            className='program-icon'
          />
            <span>{ programThemes[program.theme] }</span>
          </div>
        </div>
        <div>
          <button 
            onClick={handleNavigateProgram}
          >
            <span>Voir le programme</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProgramCard