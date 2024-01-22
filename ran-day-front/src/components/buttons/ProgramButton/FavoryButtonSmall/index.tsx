import './index.css';
import { BsHeart } from "react-icons/bs";
import { useProgramContext } from '../../../../contexts/ProgramContextProvider';
import { ProgramButtonProps } from '../FavoryButton';


const FavoryButtonSmall: React.FC<ProgramButtonProps> = ({saveProgram}) => {

  const {program} = useProgramContext();

  return (
    <button 
      className={`
        ${!program.favorite ? "favory-button-small" : "favory-button-small-active"}
      `}
      onClick={
        !program.favorite && !program.save ?
          saveProgram :
          () => console.log('toto')
      }
    >
      <BsHeart className="favory-icon-small"/>
    </button>
  )
}

export default FavoryButtonSmall;