import './index.css'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  SelectChangeEvent,
  Backdrop,
  CircularProgress } from '@mui/material'
import { Dayjs } from 'dayjs'
import PlaceInput from '../forms/PlaceInput'
import { useProgramContext } from '../../contexts/ProgramContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import { set } from 'react-hook-form'


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
    loadingPrograms,
    setPrograms, 
    setProgramDate,
    setProgramCity,
    setLoadingPrograms} = useProgramContext();
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

    setLoadingPrograms(true);

    axiosClient.get(`/place?city=${placeInput}&program=${programType}`)
    .then(({data}) => {
      console.log(data);
      setDate(null);
      setProgramType('');
      setPlaceInput('');
      setProgramCity(placeInput);
      setPrograms(data);
      setProgramDate(date);
      navigateProgram('/program');  
      setLoadingPrograms(false);
    })
    .catch(() => {
      setLoadingPrograms(false);
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
      {
        loadingPrograms &&
          createPortal(
            <Backdrop
              sx={{ 
                color: '#FDFDFF', 
                zIndex: (theme) => theme.zIndex.drawer + 1 
              }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>,
            document.body
          )
      }
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