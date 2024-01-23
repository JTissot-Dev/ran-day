import './index.css'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import SearchForm from '../../components/SearchForm'
import Places from '../../components/Places'
import Themes from '../../components/Themes'
import axiosClient from '../../axiosClient'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import { useProgramContext } from '../../contexts/ProgramContextProvider'


interface ProgramInfos {
  place: string,
  theme: string,
  path: string
}

const getRandomElement = (array: Array<any>): string => {
  return array[Math.floor(Math.random() * array.length)]
}

const Home: React.FC = () => {

  const { setAlert } = useAlertContext();
  const { 
    setProgram, 
    setLoadingProgram} = useProgramContext();
  
  const navigateProgram = useNavigate();

  const getProgram = (filterType: string, filterValue: string): void => {
    setLoadingProgram(true);

    const programTypes = [
      'classic-program',
      'culture-program', 
      'outdoor-program', 
      'party-program',
    ]

    const places = [
      'Lyon',
      'Paris',
      'Saint-Malo',
      'Bordeaux',
      'Strasbourg'
    ]

    const randomProgramType: string = getRandomElement(programTypes);
    const randomPlace: string = getRandomElement(places);

    const programsInfos: ProgramInfos = filterType === "place" ?
      {
        place: filterValue,
        theme: randomProgramType,
        path: `/place?city=${filterValue}&program=${randomProgramType}`
      } :
      {
        place: randomPlace,
        theme: filterValue,
        path: `/place?city=${randomPlace}&program=${filterValue}`
      }


    axiosClient.get(programsInfos.path)
    .then(({data}) => {
      setProgram({
        id: null,
        city: programsInfos.place,
        date: dayjs().add(1, 'day'),
        theme: programsInfos.theme,
        save: false,
        favorite: false,
        activities: data
      })
      setLoadingProgram(false);
      navigateProgram('/program');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    })
    .catch(() => {
      setAlert({
        type: "Error",
        message: "Une erreur est survenue veuillez actualiser la page.",
        layout: "Default"
      })
      setLoadingProgram(false);
    })
  }

  return (
    <div className="grid-home">
      <section className="welcome">
        <h1>
          <span>Le </span>
          <span>programme de votre journée</span>
          <span> sans y passer la journée.</span>
        </h1>
        <h2>
          Choisissez un lieu, une date et on s'occupe du reste.
        </h2>
      </section>
      <section className="search">
        <SearchForm />
      </section>
      <section className="places">
        <Places getProgram={ getProgram }/>
      </section>
      <section className="themes">
        <Themes getProgram={ getProgram }/>
      </section>
    </div>
  )
}

export default Home