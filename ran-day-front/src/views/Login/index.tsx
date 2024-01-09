import './index.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import BrandIcon from '../../components/icons/BrandIcon'
import BasicButton from '../../components/buttons/BasicButton'


interface IFormInput {
  email: string,
  password: string
}

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: React.FC = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setError, 
    watch, 
    clearErrors } = useForm<IFormInput>();

  const [formStep, setFormStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const handleEmailStep = () => {
    if (emailRegex.test(watch("email"))) {
      clearErrors();
      setFormStep(2);
    } else {
      setError("email", 
      { 
        type: "custom", 
        message: "Email incorrect" 
      })
    }
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
      <BrandIcon />
      <div className="container-title">
        <h1>Se connecter</h1>
      </div>
      {
        formStep === 1 ?
          <div key="step1" className="container-step">
            <TextField 
              className="email-form"
              {...register("email")}
              id="email" 
              type="email"
              label="Saisissez votre email" 
              variant="outlined" 
              fullWidth
              error={ errors.email ? true : false }
              helperText={ errors.email?.message }
              sx={{
                '.MuiInputBase-root': {
                  borderRadius: '15px'
                }
              }}
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
        <div key="step2" className="container-step">
          <TextField 
            className="password-form"
            {...register("password")}
            id="password" 
            type="password"
            label="Saisissez votre mot de passe" 
            variant="outlined" 
            fullWidth
            error={ errors.email ? true : false }
            helperText={ errors.email?.message }
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
        </div>
      }
      
      <div className="container-footer">
        <p>©Copyright 2023 - RanDay</p>
      </div>
    </form>
  )
}

export default Login