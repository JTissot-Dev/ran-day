import './index.css'
import { useEffect, useState, useRef } from 'react'
import { BsGeoAlt } from "react-icons/bs"
import { useAlertContext } from '../../contexts/AlertContextProvider'

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

const PlaceInput = () => {

  const [cities, setCities] = useState<City[]>([]);
  const [citySelect, setCitySelect] = useState<boolean>(false);
  const [placeInput, setPlaceInput] = useState<string>('');
  const placeInputRef = useRef<HTMLInputElement|null>(null);
  const placeLabelRef = useRef<HTMLLabelElement|null>(null);
  const {setAlert} = useAlertContext();

  useEffect(() => {
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
    .catch((error: Error) => {
      setAlert({
        type: 'Error',
        message: error.message
      })
    })
  }, [placeInput]);

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
          required
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