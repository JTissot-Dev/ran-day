import './index.css';
import { BsBookmark } from "react-icons/bs";
import { useProgramContext } from '../../../../contexts/ProgramContextProvider';
import { ProgramButtonProps } from '../FavoryButton';


const SaveButton: React.FC<ProgramButtonProps> = ({saveProgram}) => {

  const {program} = useProgramContext();

  return (
    <button 
      className={`
        ${!program.save ? "save-button" : "save-button-active"}
      `}
      onClick={
        !program.favorite && !program.save ?
          saveProgram :
          () => console.log('toto')
      }
    >
      <BsBookmark className="save-icon"/>
      <span>Enregistrer</span>
    </button>
  )
}

export default SaveButton;