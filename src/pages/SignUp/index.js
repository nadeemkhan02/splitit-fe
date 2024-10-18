import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { InputField, InputPasswordField } from '../../common/InputField'
import colors from '../../constants/colors'
import CustomButton from '../../common/CustomButton'
import { form } from 'framer-motion/client'
import { signUpApiUrl } from '../../utils/urls'
import axios from 'axios'
import { toastMessage } from '../../common/ToastMessage'

const SignUp = () => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    isValidForm: true,
  })
  const validateForm = (formDetails) => {
    if (
      formDetails.isValidName &&
      formDetails.isValidEmail &&
      formDetails.isValidPassword &&
      formDetails.isValidConfirmPassword
    ) {
      return true
    }
    return false
  }
  // Handle input change
  const handleChange = (e) => {
    const FormDetails = { ...formDetails }
    const { name, value } = e.target
    // Validate fields
    switch (name) {
      case 'name':
        FormDetails.isValidName = value.trim().length > 0
        break
      case 'email':
        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        FormDetails.isValidEmail = emailPattern.test(value)
        break
      case 'password':
        FormDetails.isValidPassword = value.length >= 6 // Example password validation
        break
      case 'confirmPassword':
        FormDetails.isValidConfirmPassword = value === formDetails.password
        break
      default:
        break
    }
    FormDetails[name] = value
    FormDetails.isValidForm = validateForm(FormDetails)
    setFormDetails(FormDetails)
  }

  const hadleSubmit = (e) => {
    e.preventDefault()
    if (formDetails.isValidForm) {
      console.log('Form submitted', formDetails)
      const payload = {
        name: formDetails.name,
        email: formDetails.email,
        password: formDetails.password,
      }
      console.log(payload)
      axios
        .post(signUpApiUrl, payload)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            toastMessage('success', 'Sign up successful')
          } else {
            console.log(response.response, '<<>>')
            toastMessage('error', response.response.data)
          }
        })
        .catch((error) => {
          console.log(error)
          toastMessage('error', error?.response?.data)
        })
    } else {
      console.log('Form is invalid')
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
            Sign Up
          </Typography>
          <form onSubmit={hadleSubmit}>
            {/* Name field */}
            <Box sx={{ mb: '14px' }}>
              <InputField
                label={'Name'}
                name="name"
                type="text"
                color={colors.primary}
                value={formDetails.name}
                onChange={handleChange} // Add onChange handler
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px !important',
                  },
                }}
                isValid={formDetails.isValidName}
                message={'Enter valid name'}
              />
            </Box>

            {/* Email field */}
            <Box sx={{ mb: '14px' }}>
              <InputField
                label={'Email'}
                name="email"
                type="email"
                color={colors.primary}
                value={formDetails.email}
                onChange={handleChange} // Add onChange handler
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px !important',
                  },
                }}
                isValid={formDetails.isValidEmail}
                message={'Enter valid email'}
              />
            </Box>

            {/* Password field */}
            <Box sx={{ mb: '14px' }}>
              <InputPasswordField
                label={'Password'}
                name="password"
                value={formDetails.password}
                onChange={handleChange} // Add onChange handler
                isValid={formDetails.isValidPassword}
                message={'Password must be at least 6 characters'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px !important',
                  },
                }}
              />
            </Box>

            {/* Confirm Password field */}
            <Box sx={{ mb: '14px' }}>
              <InputPasswordField
                label={'Confirm Password'}
                name="confirmPassword"
                value={formDetails.confirmPassword}
                onChange={handleChange} // Add onChange handler
                isValid={formDetails.isValidConfirmPassword}
                message={'Please confirm your password'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px !important',
                  },
                }}
              />
            </Box>

            {/* Sign Up Button */}
            <CustomButton
              handleClick={() => {
                console.log('Sign Up')
              }}
              text={'Sign Up'}
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

export default SignUp
