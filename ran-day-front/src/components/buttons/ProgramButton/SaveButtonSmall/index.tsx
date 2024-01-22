import './index.css';
import { BsBookmark } from "react-icons/bs";
import { useProgramContext } from '../../../../contexts/ProgramContextProvider';
import { ProgramButtonProps } from '../FavoryButton';


const SaveButtonSmall: React.FC<ProgramButtonProps> = ({saveProgram}) => {

  const {program} = useProgramContext();

  return (
    <button 
      className={`
        ${!program.save ? "save-button-small" : "save-button-small-active"}
      `}
      onClick={
      !program.favorite && !program.save ?
        saveProgram :
        () => console.log('toto')
      }
    >
      <BsBookmark className="save-icon-small"/>
    </button>
  )
}

export default SaveButtonSmall;