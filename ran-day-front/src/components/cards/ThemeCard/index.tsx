import './index.css'
import { Theme } from '../../Themes'

interface ThemeProps extends Theme {
  getProgram: Function
}

const programThemes: any = {
  Culture: 'culture-program',
  Nature: 'outdoor-program',
  Festif: 'party-program'
}


const ThemeCard: React.FC<ThemeProps> = ({title, imgPath, getProgram}) => {
  return (
    <article className="theme-article">
      <button 
        className="btn-theme"
        onClick={ () => {
          getProgram("theme", programThemes[title]) 
        }}
      >
        <h3 className="theme-title">{ title }</h3>
        <img 
          className="theme-img"
          src={ imgPath } 
          alt="theme-img" />
      </button>
    </article>
  )
}

export default ThemeCard