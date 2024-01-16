import './index.css'
import { useEffect, useState, useRef } from 'react'
import { BsGeoAlt } from "react-icons/bs"
import { useAlertContext } from '../../../contexts/AlertContextProvider'
import { FormError } from '../../SearchForm'


interface City {
  nom: string,
  code: string,
  codesPostaux: string[],
  siren: string,
  codeEpci: string,
  codeDepartement: string,
  codeRegion: string,
  population: number,
  _score: number
}

interface PlaceInputProps {
  formError: FormError,
  setFormError: React.Dispatch<React.SetStateAction<FormError>>,
  placeInput: string,
  setPlaceInput: React.Dispatch<React.SetStateAction<string>>
}

const PlaceInput: React.FC<PlaceInputProps> = ({
  formError, 
  setFormError,
  placeInput, 
  setPlaceInput}) => {

  const [cities, setCities] = useState<City[]>([]);
  const [citySelect, setCitySelect] = useState<boolean>(false);
  
  const placeInputRef = useRef<HTMLInputElement|null>(null);
  const placeLabelRef = useRef<HTMLLabelElement|null>(null);
  const {setAlert} = useAlertContext();

  useEffect(() => {

    if (!placeInputRef.current) return;
    if (formError.place) {
      setFormError({
        ...formError,
        place: false
      })
    }

    if (placeInputRef.current.value === "" && placeLabelRef.current?.classList.contains('place-label-complete')) {
      placeLabelRef.current?.classList.remove('place-label-complete');
    }
    
    fetch(`https://geo.api.gouv.fr/communes?nom=${placeInput}&limit=5`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Une erreur est survenue, veuillez actualiser la page');
      };
      return response.json();
    })
    .then((data: City[]) => {
      setCities(data);
    })
    .catch(() => {
      setAlert({
        type: 'Error',
        message: 'Une erreur est survenue veuillez actualiser la page.',
        layout: 'Default'
      })
    })
  }, [placeInput]);

  useEffect(() => {
    if (formError.place) {
      placeInputRef.current?.focus();
      placeInputRef.current?.classList.add('input-error');
    } else {
      if (placeInputRef.current?.classList.contains('input-error')) {
        placeInputRef.current?.classList.remove('input-error');
      }
    }
  }, [formError.place])

  const handleCity = (city: string) => {
    setPlaceInput(city);
  }

  const handleBlurPlace = () => {
    setCitySelect(false)
    if (!placeInputRef.current) return;

    if (placeInputRef.current.value !== "" && !placeLabelRef.current?.classList.contains('place-label-complete')) {
      placeLabelRef.current?.classList.add('place-label-complete');
    } else if (placeInputRef.current.value === "" && placeLabelRef.current?.classList.contains('place-label-complete')) {
      placeLabelRef.current?.classList.remove('place-label-complete');
    }
  }

  const citiesDisplay =  ( citySelect &&
    <ul className='cities-display'>
      {cities.length > 0 ? (
        cities.map((value) => (
          <li key={value.siren}>
            <button 
              type="button" 
              onMouseDown={() => handleCity(value.nom)}
            >
              <span>{value.nom}</span>
              <span>{`(${value.codeDepartement})`}</span>
            </button>
          </li>
        ))
      ) : (
        <li className='no-result'>Aucun résultat</li>
      )}
    </ul>
  );

  return (
    <div className='place'>
      <BsGeoAlt className='place-icon'/>
      <input 
          id="city"
          name="city"
          ref={ placeInputRef }
          className="place-input"
          type="text" 
          value={ placeInput }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceInput(e.target.value)}
          onFocus={() => setCitySelect(true)}
          onBlur={handleBlurPlace}
          autoComplete="off"
      />
      <label 
        htmlFor="city"
        ref={ placeLabelRef }
        className="place-label"
      >
        Selectionner un lieu
      </label>
      {citiesDisplay}
    </div>
  )
}

export default PlaceInput