import './index.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'
import { LocalizationProvider} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  SelectChangeEvent } from '@mui/material'
import { Dayjs } from 'dayjs'
import PlaceInput from '../forms/PlaceInput'
import { useProgramContext } from '../../contexts/ProgramContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'


export interface FormError {
  place: boolean,
  date: boolean,
  programType: boolean
}


const SearchForm: React.FC = () => {

  const [date, setDate] = useState<Dayjs | null>(null);
  const [formError, setFormError] = useState<FormError>({
    place: false,
    date: false,
    programType: false
  });
  const [placeInput, setPlaceInput] = useState<string>('');
  const datePickerRef = useRef<HTMLInputElement>(null);
  const programSelectRef = useRef<HTMLSelectElement>(null);
  const [programType, setProgramType] = useState<string>('');

  const {
    program,
    setProgram,
    setLoadingProgram} = useProgramContext();
  const {setAlert} = useAlertContext();

  const navigateProgram = useNavigate();

  const handleSelectChange = (e: SelectChangeEvent<string>)  => {
    setProgramType(e.target.value);
    setFormError({
      ...formError,
      programType: false
    })
  }

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    setFormError({
      ...formError,
      date: false
    })
  }
  console.log(program)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!placeInput) {
      setFormError({
        ...formError,
        place: true})
      return;
    }
    
    if (!date) {
      datePickerRef.current?.querySelector('input')?.focus();
       setFormError({
        ...formError,
        date: true})
      return;
    }

    if (!programType) {
      programSelectRef.current?.focus();
       setFormError({
        ...formError,
        programType: true})
      return;
    }

    setLoadingProgram(true);
    
    axiosClient.get(`/place?city=${placeInput}&program=${programType}`)
    .then(({data}) => {
      
      setProgram({
        id: null,
        city: placeInput,
        date: date,
        theme: programType,
        save: false,
        favorite: false,
        activities: data,
      })

      setDate(null);
      setProgramType('');
      setPlaceInput('');
      
      navigateProgram('/program');  
      setLoadingProgram(false);
    })
    .catch(() => {
      setLoadingProgram(false);
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
        formError={formError}
        setFormError={setFormError}
        placeInput={placeInput}
        setPlaceInput={setPlaceInput}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          disablePast
          className="date-picker"
          ref={datePickerRef}
          label="Selectionner une date"
          views={['year', 'month', 'day']}
          value={date}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              error: formError.date,
            },
          }}
          sx= {{
            '.MuiInputBase-root': {
              borderRadius: '15px',
              marginRight: '20px',
              height: '57px',
            },
            '@media (max-width: 970px)': {
              '.MuiInputBase-root': {
                marginRight: '0px',
                marginBottom: '20px',
                width: '100%'
              }
            }
          }}
      />
      </LocalizationProvider>
      <FormControl
        error={formError.programType}
        sx={{
          width: '100%',
          marginRight: '20px',
          '.MuiInputBase-root': {
            borderRadius: '15px',
            height: '57px',
          },
          '@media (max-width: 970px)': {
            marginRight: '0px',
            '.MuiInputBase-root': {
              marginRight: '0px',
              marginBottom: '20px',
            }
          }
        }}
      >
        <InputLabel id="select-program-type-label">Programme</InputLabel>
        <Select
          labelId="select-program-type-label"
          id="select-program-type"
          value={programType}
          label="Programme"
          onChange={handleSelectChange}
          inputRef={programSelectRef}
        >
          <MenuItem value="classic-program">Classique</MenuItem>
          <MenuItem value="outdoor-program">Nature</MenuItem>
          <MenuItem value="party-program">Festif</MenuItem>
          <MenuItem value="culture-program">Culture</MenuItem>
        </Select>
      </FormControl>
      <button 
        className="btn-search"
        type="submit"
      >
        <span>
          Rechercher
        </span>
      </button>
    </form>
    
  )
}


export default SearchForm