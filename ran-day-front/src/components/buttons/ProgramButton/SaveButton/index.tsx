import './index.css'
import { BsBookmark } from "react-icons/bs"
import { useProgramContext } from '../../../../contexts/ProgramContextProvider'
import { useAuthContext } from '../../../../contexts/AuthContextProvider'


const SaveButton: React.FC = () => {

  const {program, setProgram} = useProgramContext();
  const {currentUser} = useAuthContext();

  return (
    <button 
      className={`
        ${!program.save ? "save-button" : "save-button-active"}
        ${!currentUser.token ? "save-button-disable" : ""}
      `}
      onClick={() => setProgram(prevProgram => ({
        ...prevProgram,
        save: !program.save
      }))}
      disabled={
        !currentUser.token ? true : false
      }
    >
      <BsBookmark className="save-icon"/>
      <span>Enregistrer</span>
    </button>
  )
}

export default SaveButton;