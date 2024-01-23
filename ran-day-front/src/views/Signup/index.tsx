import './index.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TextField, 
  Checkbox, 
  FormControlLabel,
  LinearProgress } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useAlertContext } from '../../contexts/AlertContextProvider'
import axiosClient from '../../axiosClient'
import BrandIcon from '../../components/icons/BrandIcon'
import BasicButton from '../../components/buttons/BasicButton'


interface IFormInput {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Signup: React.FC = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    trigger,
    setFocus,
    clearErrors,
    watch
  } = useForm<IFormInput>();

  const [formStep, setFormStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<string>('');
  const { dispatch } = useAuthContext();
  const { setAlert } = useAlertContext(); 
  const navigate = useNavigate();
  

  const handleName = () => {
    trigger(["firstName", "lastName"]).then(isValid => {
      isValid && setFormStep(2)
    })
  }

  const handleEmailStep = () => {
    trigger("email").then(isValid => {
      isValid ? setFormStep(3) : setFocus("email");
    })
  }

  useEffect(() => {
    formStep === 1 ? setFocus("firstName") :
    formStep === 2 ? setFocus("email") :
    formStep === 3 && setFocus("password"); 
  }, [formStep])

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setLoading(true);
    const { firstName, lastName, email, password } = formData;
    axiosClient.post('/signup', {
      firstName,
      lastName,
      email,
      password
    })
    .then(({data}) => {
      dispatch({
        type: "authentication",
        value: {
          user: {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
          token: data.token
        }
      })
      setLoading(false);
      navigate("/index");
    })
    .catch(({response}) => {
      setLoading(false);
      if (response && response.status === 422) {
        setSignupError("L'adresse email ou le mot de passe saisie existe déjà.");
      } else {
        setAlert({
          type: "Error", 
          message: "Une erreur est survenue, veuillez actualiser la page.",
          layout: "Guest"
        }); 
      }
    })
  }

  return (
    <form 
      className="signup-form"
      noValidate
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(onSubmit)(e)
      } }
    > 
      <div className="progress-bar">
        { loading && <LinearProgress />}
      </div>
      <BrandIcon />
      <div className="container-title-signup">
        <h1>Inscription</h1>
      </div>
      <div className="container-signup-form">
        {
          formStep === 1 ?
          <div key="step1" className="container-step">
            <TextField 
              className="input-form"
              {...register("firstName", {required: true})}
              id="first-name" 
              type="text"
              label="Prénom" 
              variant="outlined" 
              fullWidth
              error={ errors.firstName ? true : false }
              helperText={ errors.firstName && "Saisir votre Prénom" }
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '15px'
                }
              }}
              onChange={() => clearErrors("firstName")}
            />
            <div className="mt-5">
              <TextField 
                className="input-form"
                {...register("lastName", {required: true})}
                id="last-name" 
                type="text"
                label="Nom" 
                variant="outlined" 
                fullWidth
                error={ errors.lastName ? true : false }
                helperText={ errors.lastName && "Saisir votre Nom" }
                sx={{
                  '.MuiInputBase-root': {
                    borderRadius: '15px'
                  }
                }}
                onChange={() => clearErrors("lastName")}
              />
            </div>
            <div className="container-btn">
              <BasicButton
                type="button"
                action={ handleName }
              >
                Suivant
              </BasicButton>
            </div>
            <div className="link-login">
              <Link  
                to="/login">
                  Déjà inscrit? Se connecter
              </Link>
            </div>
          </div> :
          formStep === 2 ?
            <motion.div 
              key="step2" 
              className="container-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.2,
                delay: 0.1,
              }}
            >
              <TextField 
                className="input-login-form"
                {...register("email", { 
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}
                id="email" 
                type="email"
                label="Saisissez votre email" 
                variant="outlined" 
                fullWidth
                error={ errors.email ? true : false }
                helperText={ errors.email && "Email invalide" }
                sx={{
                  '.MuiInputBase-root': {
                    borderRadius: '15px'
                  }
                }}
                onChange={() => clearErrors("email")}
              />
              <div className="container-btn">
                <BasicButton
                  type="button"
                  action={ handleEmailStep }
                >
                  Suivant
                </BasicButton>
              </div>
            </motion.div> :
          
          formStep === 3 &&
          <motion.div 
            key="step3" 
            className="container-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.2,
              delay: 0.1,
            }}
          >
            <TextField 
              className="input-form"
              {...register("password", {
                required: true,
                pattern: /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/
              })}
              id="password" 
              type={ showPassword ? "text" : "password" }
              label="Saisissez votre mot de passe" 
              variant="outlined" 
              fullWidth
              error={ errors.password ? true : false }
              helperText={ 
                errors.password && 
                  "Mot de passe: au moin une majuscule et > 8 caractères" 
              }
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '15px'
                }
              }}
              onChange={() => clearErrors("password")}
            />
            <FormControlLabel 
              className="controle-label"
              control={
                <Checkbox 
                  onChange={() => setShowPassword(prev => !prev) }
                />
              } 
              label="Afficher le mot de passe" 
            />
            <div
              className="mt-5 mb-2"
            >
              <TextField 
                className="input-form"
                {...register("confirmPassword", {
                  validate: (value: string) => value === watch("password")
                })}
                id="confirm-password" 
                type="password"
                label="Confirmer votre mot de passe" 
                variant="outlined" 
                fullWidth
                error={ errors.confirmPassword ? true : false }
                helperText={ 
                  errors.confirmPassword && 
                    "Les mots de passes saisies doivent être identiques"
                }
                sx={{
                  '.MuiInputBase-root': {
                    borderRadius: '15px'
                  }
                }}
                onChange={() => clearErrors("confirmPassword")}
              />
            </div>
            <div className="container-btn-step">
              <BasicButton
                type="submit"
              >
                Suivant
              </BasicButton>
            </div>
            <p className="signup-error">{ signupError }</p>
          </motion.div>
        }
      </div>
      <div className="container-footer">
        <p>©Copyright 2023 - RanDay</p>
      </div>
    </form>
  )
}

export default Signup