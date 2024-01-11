import { ReactNode, createContext, useContext, useState } from "react"

export interface Alert {
  type: string,
  message: string,
  layout: string
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
    message: '',
    layout: ''
  },
  setAlert: () => {}
})

export const AlertContextProvider: React.FC<Props> = ({children}) => {

  const [alert, setAlert] = useState<Alert>({
    type: '',
    message: '',
    layout: ''
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
