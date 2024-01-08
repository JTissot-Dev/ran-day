import { ReactNode, createContext, useContext, useState } from "react"

export interface Alert {
  type: string,
  message: string
}

interface AlertValues {
  alert: Alert,
  setAlert: React.Dispatch<React.SetStateAction<Alert>>
}

interface Props {
  children: ReactNode
}

const alertContext = createContext<AlertValues>({
  alert: {
    type: '',
    message: ''
  },
  setAlert: () => {}
})

export const AlertContextProvider: React.FC<Props> = ({children}) => {

  const [alert, setAlert] = useState<Alert>({
    type: '',
    message: ''
  });

  return (
    <alertContext.Provider value={{
          alert,
          setAlert
        }
      }
    >
      { children }
    </alertContext.Provider>
  )
}

export const useAlertContext = (): AlertValues => useContext(alertContext);
