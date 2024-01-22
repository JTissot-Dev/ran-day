import { createContext, useState, useContext } from "react";
import { Dayjs } from 'dayjs'


interface Activity {
  id: number,
  type: string,
  name: string,
  latitude: number,
  longitude: number
}

export interface Program {
  id: number | null,
  city: string,
  date: Dayjs | null,
  theme: string,
  save: boolean,
  favorite: boolean,
  activities: Activity[] | []
}

interface ProgramContextProps {
  children: React.ReactNode
}

interface ProgramContextValues {
  program: Program,
  loadingProgram: boolean,
  setProgram: React.Dispatch<React.SetStateAction<Program>>,
  setLoadingProgram: React.Dispatch<React.SetStateAction<boolean>>,
}

const programContext = createContext<ProgramContextValues>({
  program: {
    id: null,
    city: "",
    date: null,
    theme: "",
    save: false,
    favorite: false,
    activities: []
  },
  loadingProgram: false,
  setProgram: () => {},
  setLoadingProgram: () => {}
});


export const ProgramContextProvider: React.FC<ProgramContextProps> = ({ 
  children }) => {

  const [program, setProgram] = useState<Program>({
    id: null,
    city: "",
    date: null,
    theme: "",
    save: false,
    favorite: false,
    activities: []
  });
  const [loadingProgram, setLoadingProgram] = useState<boolean>(false);

  return (
    <programContext.Provider value={{
      program,
      loadingProgram,
      setLoadingProgram,
      setProgram
    }}>
      {children}
    </programContext.Provider>
  )
}

export const useProgramContext = () => useContext(programContext);