import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { InputField, InputPasswordField } from '../../common/InputField'
import colors from '../../constants/colors'
import CustomButton from '../../common/CustomButton'
import axios from 'axios'
import { toastMessage } from '../../common/ToastMessage'
import { signInApiUrl } from '../../utils/urls' // Replace with your actual sign-in API URL
import { ROUTE_PATH } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    isValidEmail: true,
    isValidPassword: true,
    isValidForm: false,
  })
  const navigate = useNavigate()

  const validateForm = (formDetails) => {
    return formDetails.isValidEmail && formDetails.isValidPassword
  }

  const handleChange = (e) => {
    const updatedFormDetails = { ...formDetails }
    const { name, value } = e.target

    // Validate fields
    switch (name) {
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        updatedFormDetails.isValidEmail = emailPattern.test(value)
        break
      case 'password':
        updatedFormDetails.isValidPassword = value.length >= 8
        break
      default:
        break
    }

    updatedFormDetails[name] = value
    updatedFormDetails.isValidForm = validateForm(updatedFormDetails)
    setFormDetails(updatedFormDetails)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formDetails.isValidForm) {
      const payload = {
        email: formDetails.email,
        password: formDetails.password,
      }
      axios
        .post(signInApiUrl, payload)
        .then((response) => {
          if (response.status === 200) {
            toastMessage('success', 'Sign in successful') // Get the auth-token from headers
            localStorage.setItem('user', JSON.stringify(response.data))
            window.location.reload() // Force page reload
          } else {
            toastMessage('error', response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          toastMessage('error', error?.response?.data || 'Sign in failed')
        })
    } else {
      toastMessage('error', 'Please enter valid credentials')
    }
  }

  return (
    <Box>
      <NavBar />
      {/* Center the form container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '92vh',
          padding: '24px',
          backgroundColor: '#f4f4f9', // Light background for contrast
        }}>
        {/* Form container with shadow and padding */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '32px',
            borderRadius: '4px',
          }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              mb: '18px',
              fontWeight: 400,
              fontFamily: 'Poppins',
            }}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <Box sx={{ mb: '24px' }}>
              <InputField
                label={'Email'}
                name="email"
                type="email"
                color={colors.primary}
                value={formDetails.email}
                onChange={handleChange}
                isValid={formDetails.isValidEmail}
                message={'Enter a valid email'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px !important',
                  },
                }}
              />
            </Box>

            {/* Password field */}
            <InputPasswordField
              label={'Password'}
              name="password"
              value={formDetails.password}
              onChange={handleChange}
              isValid={formDetails.isValidPassword}
              message={'Password must be at least 8 characters'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '44px !important',
                },
              }}
            />

            <CustomButton
              handleClick={handleSubmit}
              text={'Sign In'}
              loadinButtonWidth={'100%'}
              sx={{
                height: '44px',
                width: '100%',
                mt: '20px',
                backgroundColor: colors.primary,
                color: '#fff',
                '&:hover': { backgroundColor: colors.primaryDark },
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
              }}
              disabled={!formDetails.isValidForm} // Disable button if form is invalid
            />
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn
