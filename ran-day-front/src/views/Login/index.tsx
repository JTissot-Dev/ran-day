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
  email: string,
  password: string
}

const Login: React.FC = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    trigger,
    setFocus,
    clearErrors
  } = useForm<IFormInput>();

  const [formStep, setFormStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const { dispatch } = useAuthContext(); 
  const { setAlert } = useAlertContext();  
  const navigate = useNavigate();

  useEffect(() => {
    formStep === 1 ? setFocus("email") :
    formStep === 2 && setFocus("password");
  }, [formStep])

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setLoading(true);
    axiosClient.post('/login', formData)
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
          setLoginError("Email ou mot de passe invalide");
        } else {
          setAlert({
            type: "Error",
            message: "Une erreur est survenue, veuillez actualiser la page",
            layout: "Default"
          });
        }
      })
  }

  const handleEmailStep = () => {
    trigger("email").then(isValid => {
      isValid ? setFormStep(2) : setFocus("email");
    })
  }


  return (
    <form 
      className="login-form"
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
      <div className="container-title">
        <h1>Se connecter</h1>
      </div>
      <div className="container-form">
        {
          formStep === 1 ?
            <div key="step1" className="container-step">
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
              <div className="link-signup">
                <Link  
                  to="/signup">
                    Créer un compte
                </Link>
              </div>
            </div> :
          
          formStep === 2 &&
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
              {...register("password", { required: true })}
              id="password" 
              type={showPassword ? "text" : "password"}
              label="Saisissez votre mot de passe" 
              variant="outlined" 
              fullWidth
              error={ errors.password ? true : false }
              helperText={ errors.password && "Saisir un mot de passe" }
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '15px'
                }
              }}
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
            <div className="container-btn-step">
              <BasicButton
                type="submit"
              >
                Suivant
              </BasicButton>
            </div>
            <p className="login-error">{ loginError }</p>
          </motion.div>
        }
      </div>
      <div className="container-footer">
        <p>©Copyright 2023 - RanDay</p>
      </div>
    </form>
  )
}

export default Login