import './index.css'
import ThemeCard from "../cards/ThemeCard"


interface ThemesProps {
  getProgram: Function
}


export interface Theme {
  title: string
  imgPath: string
}


const Themes:React.FC<ThemesProps> = ({getProgram}) => {

  const themes: Theme[] = [
    {
      title: "Nature",
      imgPath: "/img/activity-natureReserve.jpg"
    },
    {
      title: "Culture",
      imgPath: "/img/activity-museum.jpg"
    },
    {
      title: "Festif",
      imgPath: "/img/activity-nightclub.jpg"
    }
  ]

  return (
    <div>
      <h2 className="themes-title">
        Un programme adapté à votre humeur
      </h2>
      <div className="grid-themes">
        {
          themes.map((activity, index) => {
            return (
              <ThemeCard 
                key={ index }
                title={ activity.title }
                imgPath={ activity.imgPath }
                getProgram={ getProgram }
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Themes