import { createContext, useState, useContext } from "react";
import { Dayjs } from 'dayjs'


interface ProgramContextProps {
  children: React.ReactNode
}

interface Program {
  programCity: string | null, 
  programDate: Dayjs | null,
  programs: Object[] | [],
  loadingPrograms: boolean,
  setPrograms: React.Dispatch<React.SetStateAction<Object[]>>,
  setProgramDate: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  setProgramCity: React.Dispatch<React.SetStateAction<string | null>>,
  setLoadingPrograms: React.Dispatch<React.SetStateAction<boolean>>
}

const programContext = createContext<Program>({
  loadingPrograms: false,
  programCity: null,
  programDate: null,
  programs: [],
  setPrograms: () => {},
  setProgramDate: () => {},
  setProgramCity: () => {},
  setLoadingPrograms: () => {}
});


export const ProgramContextProvider: React.FC<ProgramContextProps> = ({ 
  children }) => {

  const [programCity, setProgramCity] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Object[] | []>([]);
  const [programDate, setProgramDate] = useState<Dayjs | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);

  return (
    <programContext.Provider value={{
      loadingPrograms,
      programCity,
      programDate,
      programs,
      setPrograms,
      setProgramDate,
      setProgramCity,
      setLoadingPrograms
    }}>
      {children}
    </programContext.Provider>
  )
}

export const useProgramContext = () => useContext(programContext);