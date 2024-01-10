import './index.css'
import { useState } from 'react'
import { BsRocketTakeoff } from "react-icons/bs"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import PlaceInput from '../forms/PlaceInput'


const SearchForm: React.FC = () => {

  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <form className="search-form">
      <PlaceInput />
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