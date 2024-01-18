import { createContext, useState, useContext } from "react";
import { Dayjs } from 'dayjs'


interface Program {
  city: string,
  date: Dayjs | null,
  theme: string,
  activities: Object[] | []
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
    city: "",
    date: null,
    theme: "",
    activities: []
  },
  loadingProgram: false,
  setProgram: () => {},
  setLoadingProgram: () => {}
});


export const ProgramContextProvider: React.FC<ProgramContextProps> = ({ 
  children }) => {

  const [program, setProgram] = useState<Program>({
    city: "",
    date: null,
    theme: "",
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