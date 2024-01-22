import './index.css';
import { BsHeart } from "react-icons/bs";
import { useProgramContext } from '../../../../contexts/ProgramContextProvider';


export interface ProgramButtonProps {
  saveProgram: () => void
}

const FavoryButton: React.FC<ProgramButtonProps> = ({saveProgram}) => {

  const {program} = useProgramContext();

  return (
    <button 
      className={`
        ${!program.favorite ? "favory-button" : "favory-button-active"}
      `}
      onClick={
        !program.favorite && !program.save ?
          saveProgram :
          () => console.log('toto')
      }
    >
      <BsHeart className="favory-icon"/>
      <span >Ajouter aux favoris</span>
    </button>
  )
}

export default FavoryButton;