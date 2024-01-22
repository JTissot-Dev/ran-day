import './index.css'
import { BsHeart } from "react-icons/bs"
import { useProgramContext } from '../../../../contexts/ProgramContextProvider'
import { useAuthContext } from '../../../../contexts/AuthContextProvider'


const FavoryButton: React.FC = () => {

  const {program, setProgram} = useProgramContext();
  const {currentUser} = useAuthContext();

  return (
    <button 
      className={`
        ${!program.favorite ? "favory-button" : "favory-button-active"}
        ${!currentUser.token ? "favory-button-disable" : ""}
      `}
      onClick={() => setProgram(prevProgram => ({
        ...prevProgram,
        favorite: !program.favorite
      }))}
      disabled={
        !currentUser.token ? true : false
      }
    >
      <BsHeart className="favory-icon"/>
      <span >Ajouter aux favoris</span>
    </button>
  )
}

export default FavoryButton;