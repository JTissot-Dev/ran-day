import './index.css'
import { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import AccountButton from '../../components/buttons/HeaderButton/AccountButton'


interface AccountFormInput {
  firstName: string,
  lastName: string,
  email: string
}

const Account: React.FC = () => {

  const { currentUser, dispatch } = useAuthContext();
  const { setAlert } = useAlertContext();

  if (!currentUser.token) {
    return <Navigate to="/index" />
  }
  
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset,
     } = useForm<AccountFormInput>();


  useEffect(() => {
    if (currentUser.user.email !== '') {
      reset({
        firstName: currentUser.user.firstName,
        lastName: currentUser.user.lastName,
        email: currentUser.user.email
      })
    }
  }, [currentUser])


  const onSubmit: SubmitHandler<AccountFormInput>  = formData => {
    const userId: number|null = currentUser.user.userId;
    axiosClient.put(`/user/${userId}`, formData)
      .then(({data}) => {
        dispatch({
          type: "refresh",
          value: {
            userId: data.data.userId,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            email: data.data.email
          }
        })
        setAlert({
          type: 'Success',
          message: "Vos informations ont bien été mises à jour.",
          layout: 'Default'
        })
      })
      .catch((error) => {
        const {response} = error;
        if (response && response.status === 422) {
          setAlert({
            type: 'Error',
            message: "L'adresse email transmise est déjà utilisée.",
            layout: 'Default'
          })
        } else {
          setAlert({
            type: 'Error',
            message: "Une erreur est survenue veuillez réessayer.",
            layout: 'Default'
          })
        }
      })
  }

  console.log(currentUser);

  return (
    <div className="account-container">
      <div className="account-head">
          <AccountButton 
            firstName={currentUser.user.firstName}
            lastName={currentUser.user.lastName}
            disabled={true}
          />
        <h1 className="account-title">
          <span>
            { 
              currentUser.user.firstName + ' ' + 
              currentUser.user.lastName
            }
          </span>
          <span>
            { currentUser.user.email }
          </span>
        </h1>
      </div>
      <form 
        className="form-account"
        onSubmit={e => {
            e.preventDefault();
            handleSubmit(onSubmit)(e)
          }
        } 
      >
          <div>
            <TextField
              {...register("firstName", {required: true})}
              className="input-account-form"
              id="first-name" 
              label="Prénom" 
              variant="outlined"
              defaultValue=" "
              error={ errors.firstName ? true : false }
              helperText={ errors.firstName && "Saisir votre Prénom" }
              sx={{
                width: '100%',
                marginRight: '20px',
                '.MuiInputBase-root': {
                  borderRadius: '15px',
                  
                }
              }}
            />
          <TextField
            {...register("lastName", {required: true})}
            className="input-account-form"
            id="last-name" 
            label="Nom" 
            variant="outlined"
            defaultValue=" "
            error={ errors.lastName ? true : false }
            helperText={ errors.lastName && "Saisir votre Nom" }
            sx={{
              width: '100%',
              '.MuiInputBase-root': {
                borderRadius: '15px',
                
              }
            }}
          />
          </div>
          <div className="email-account-container">
            <TextField
              {...register("email", { 
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}
              className="input-account-form"
              fullWidth
              id="email" 
              label="Email" 
              variant="outlined"
              defaultValue=" "
              error={ errors.email ? true : false }
              helperText={ errors.email && "Email invalide" }
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '15px'
                }
              }}
            />
          </div>
          <div className="button-account-container">
            <button className="save-button-account">
              Enregistrer
            </button>
          </div>
        </form>
    </div>
  )
}

export default Account