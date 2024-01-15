import { createContext, useState, useContext } from "react";
import { Dayjs } from 'dayjs'


interface ProgramContextProps {
  children: React.ReactNode
}

interface Program {
  programCity: string | null, 
  programDate: Dayjs | null,
  programs: Object[] | [],
  setPrograms: React.Dispatch<React.SetStateAction<Object[]>>,
  setProgramDate: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  setProgramCity: React.Dispatch<React.SetStateAction<string | null>>
}

const programContext = createContext<Program>({
  programCity: null,
  programDate: null,
  programs: [],
  setPrograms: () => {},
  setProgramDate: () => {},
  setProgramCity: () => {}
});


export const ProgramContextProvider: React.FC<ProgramContextProps> = ({ 
  children }) => {

  const [programCity, setProgramCity] = useState<string | null>(null);
  const [programs, setPrograms] = useState<Object[] | []>([]);
  const [programDate, setProgramDate] = useState<Dayjs | null>(null);

  return (
    <programContext.Provider value={{
      programCity,
      programDate,
      programs,
      setPrograms,
      setProgramDate,
      setProgramCity
    }}>
      {children}
    </programContext.Provider>
  )
}

export const useProgramContext = () => useContext(programContext);