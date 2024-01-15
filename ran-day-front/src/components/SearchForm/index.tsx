import './index.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'
import { BsRocketTakeoff } from "react-icons/bs"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import PlaceInput from '../forms/PlaceInput'
import { useProgramContext } from '../../contexts/ProgramContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'


const SearchForm: React.FC = () => {

  const [date, setDate] = useState<Dayjs | null>(null);
  const [placeInput, setPlaceInput] = useState<string>('');
  const {
    setPrograms, 
    setProgramDate,
    setProgramCity} = useProgramContext();
  
  const {setAlert} = useAlertContext();

  const navigateProgram = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(placeInput)
    e.preventDefault();
    axiosClient.get(`/place?city=${placeInput}&program=classic-program`)
    .then(({data}) => {
      console.log(data)
      setDate(null);
      setPlaceInput('');
      setProgramCity(placeInput);
      setPrograms(data);
      setProgramDate(date);
      navigateProgram('/program');  
    })
    .catch(() => {
      setAlert(
        {
          type: 'Error',
          message: 'Une erreur est survenue veuillez actualiser la page.',
          layout: 'Default'
        }
      )
    })
  }

  return (
    <form 
      className="search-form"
      onSubmit={handleSubmit}
    >
      <PlaceInput 
        placeInput={placeInput}
        setPlaceInput={setPlaceInput}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label="Selectionner une date"
          views={['year', 'month', 'day']}
          value={date}
          onChange={(newDate) => setDate(newDate)}
          sx= {{
            '.MuiInputBase-root': {
              borderRadius: '15px',
              marginRight: '20px',
              width: '350px'
            },
            '@media (max-width: 940px)': {
              '.MuiInputBase-root': {
                marginRight: '0px',
                marginBottom: '20px',
                width: '100%'
              }
            },
            '@media screen and (min-width: 940px) and (max-width: 1166px)': {
              '.MuiInputBase-root': {
                width: '280px'
              }
            }
          }}
       />
      </LocalizationProvider>
      <button 
        className="btn-search"
        type="submit"
      >
        <BsRocketTakeoff className="btn-icon"/>
        <span>
          Rechercher
        </span>
      </button>
    </form>
  )
}


export default SearchForm