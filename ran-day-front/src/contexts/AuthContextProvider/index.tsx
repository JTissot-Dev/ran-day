import { ReactNode, createContext, useContext, useReducer } from "react"


interface User {
  firstName: string,
  lastName: string,
  email: string,
}

interface CurrentUser {
  user: User,
  token: string|null
}

type AuthAction =
  | { type: "authentication"; value: CurrentUser }

interface Auth {
  currentUser: CurrentUser
  dispatch: React.Dispatch<AuthAction>
}

interface Props {
  children: ReactNode
}

const authContext = createContext<Auth>({
  currentUser: {
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
    token: ''
  },
  dispatch: () => {}
})

const setToken = (token: string|null): void => {
  if (token) {
    localStorage.setItem('ACCESS_TOKEN', token);
  } else {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}

const reducer = (state: CurrentUser, action: AuthAction) => {
  switch (action.type) {
    case 'authentication': {
      const newState = {
        user: {
          firstName: action.value.user.firstName,
          lastName: action.value.user.lastName,
          email: action.value.user.email,
        },
        token: action.value.token
      }
      setToken(newState.token);
      return (newState);
    }
    default:
      return state;
  }
}


export const AuthContextProvider: React.FC<Props> = ({children}) => {

  const initialUserState: CurrentUser = {
    user: {
      firstName: '',
      lastName: '',
      email: ''
    },
    token: localStorage.getItem('ACCESS_TOKEN')
  }

  const [currentUser, dispatch] = useReducer(reducer, initialUserState)
    
  return (
    <authContext.Provider value={{
      currentUser,
      dispatch
    }}>
      { children }
    </authContext.Provider>
  )
}

export const useAuthContext = () => useContext(authContext);