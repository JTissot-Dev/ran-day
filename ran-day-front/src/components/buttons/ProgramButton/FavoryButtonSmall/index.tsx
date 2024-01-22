import './index.css'
import { BsHeart } from "react-icons/bs"
import { useProgramContext } from '../../../../contexts/ProgramContextProvider'
import { useAuthContext } from '../../../../contexts/AuthContextProvider'


const FavoryButtonSmall: React.FC = () => {

  const {program, setProgram} = useProgramContext();
  const {currentUser} = useAuthContext();

  return (
    <button 
      className={`
        ${!program.favorite ? "favory-button-small" : "favory-button-small-active"}
        ${!currentUser.token ? "favory-button-small-disable" : ""}
      `}
      onClick={() => setProgram(prevProgram => ({
        ...prevProgram,
        favorite: !program.favorite
      }))}
      disabled={
        !currentUser.token ? true : false
      }
    >
      <BsHeart className="favory-icon-small"/>
    </button>
  )
}

export default FavoryButtonSmall;