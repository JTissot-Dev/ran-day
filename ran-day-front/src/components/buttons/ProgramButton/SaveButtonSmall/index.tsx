import './index.css'
import { BsBookmark } from "react-icons/bs"
import { useProgramContext } from '../../../../contexts/ProgramContextProvider'
import { useAuthContext } from '../../../../contexts/AuthContextProvider'


const SaveButtonSmall: React.FC = () => {

  const {program, setProgram} = useProgramContext();
  const {currentUser} = useAuthContext();

  return (
    <button 
      className={`
        ${!program.save ? "save-button-small" : "save-button-small-active"}
        ${!currentUser.token ? "save-button-small-disable" : ""}
      `}
      onClick={() => setProgram(prevProgram => ({
        ...prevProgram,
        save: !program.save
      }))}
      disabled={
        !currentUser.token ? true : false
      }
    >
      <BsBookmark className="save-icon-small"/>
    </button>
  )
}

export default SaveButtonSmall;