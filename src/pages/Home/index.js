import React from 'react'
import { motion } from 'framer-motion'
import LeftPartImage from '../../assets/images/animationImgLeft.png'
import RightPartImage from '../../assets/images/animationImgRight.png'
import NavBar from '../../components/NavBar'
import { Box, Typography } from '@mui/material'
import colors from '../../constants/colors'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../common/CustomButton'
import { ROUTE_PATH } from '../../utils/routes'

const Home = () => {
  const splitText = 'Split It'.split('')
  const navigate = useNavigate()

  const featuresList = [
    {
      title: 'Trip Planning',
      featureDescription:
        'Log individual expenses, categorize them (food, transportation, activities) for clarity.',
    },
    {
      title: 'Expense Tracking',
      featureDescription:
        'Create and customize itineraries with destinations, dates, travel modes, and accommodation choices.',
    },
    {
      title: 'Split Payments',
      featureDescription:
        'Fairly distribute costs among group members with customizable payment options: equal split, percentage-based, or specific amounts.',
    },
  ]

  return (
    <Box>
      {/* Header */}
      <NavBar />
      <Box sx={{ p: 1 }}>
        {/* descriptipion text */}
        <Box sx={{ mb: '20px' }}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              textAlign: 'left',
              color: colors.black,
              p: '30px 6px',
              fontFamily: 'Poppins',
              fontWeight: '300',
            }}>
            <span style={{ color: colors.primary }}>
              A comprehensive{' '}
              <span
                onClick={() => {
                  localStorage.setItem(
                    'user',
                    JSON.stringify({
                      name: 'Nadeem Khan',
                      email: 'nadeem.khan@yopmail.com',
                      token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGY3MjFhNDc1OGExYmE0YmE1OGY3YSIsImVtYWlsIjoibmFkZWVtLmtoYW5AeW9wbWFpbC5jb20iLCJuYW1lIjoiTmFkZWVtIEtoYW4iLCJpYXQiOjE3MjkzMzY0ODZ9.7A-B1ZWL0mGO6S7xE47ZVSyGAFUOQprnj8Wmp_bXAgI',
                    })
                  )
                  window.location.reload()
                }}>
                app
              </span>
            </span>{' '}
            designed to simplify group trip planning and expense management,
            making travel hassle-free and enjoyable
          </Typography>
        </Box>
        {/* Motion Images */}
        <Box sx={{ mb: '50px' }}>
          <Box
            style={{
              position: 'relative',
              width: 'auto',
              height: '200px',
              overflow: 'hidden',
              margin: '0 auto',
            }}>
            {/* Left Half */}
            <motion.img
              src={LeftPartImage}
              alt="Split Bill"
              style={{
                position: 'absolute',
                top: '-6px',
                left: 4,
                width: '74%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translateX(11%)',
                zIndex: 1000,
              }}
              initial={{ x: '17%' }}
              animate={{ x: '-14%' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            />
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              {/* Split It Animated Text */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2.7rem',
                  fontWeight: 'bold',
                  mt: '-14px',
                }}>
                {splitText.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: index % 2 === 0 ? -20 : 20,
                      scale: 0.5,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1 + index * 0.1, // Delay for each character
                      ease: 'easeOut',
                    }}
                    style={{ display: 'inline-block' }}>
                    {char}
                  </motion.span>
                ))}
              </Box>

              {/* Styled tagline with delay animation */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                style={{
                  fontSize: '1rem',
                  color: '#4a4a4a',
                  textAlign: 'center',
                  lineHeight: '32px',
                }}>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: '#4a4a4a',
                    textAlign: 'center',
                    fontWeight: '350',
                    lineHeight: '30px',
                  }}>
                  <span
                    style={{ color: colors.primary, cursor: 'pointer' }}
                    onClick={(e) => {
                      console.log('clicked')
                    }}>
                    Get Started!
                  </span>
                  <br /> It’s{' '}
                  <span style={{ color: colors.darkBlue }}>Free</span>, It's{' '}
                  <span style={{ color: colors.darkBlue }}>Easy</span>
                </p>
              </motion.p>
            </Box>
            {/* Right Half */}
            <motion.img
              src={RightPartImage}
              alt="Split Bill"
              style={{
                position: 'absolute',
                top: 0,
                right: 4,
                width: '74%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translateX(11%)',
                zIndex: 1000,
              }}
              initial={{ x: '-17%' }}
              animate={{ x: '14%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            />
          </Box>
        </Box>

        {/* features list */}
        <Box>
          {/* Features Heading */}
          {/* <Typography
            sx={{
              color: 'primary.main',
              fontWeight: '400',
              marginBottom: '14px',
              textAlign: 'left',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '26px',
            }}>
            Features:
          </Typography> */}
          {featuresList.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: '20px',
                padding: '10px 20px',
                background: `linear-gradient(to ${
                  index % 2 === 0 ? 'right' : 'left'
                }, ${colors.primaryLight} 40%, rgba(0, 0, 0, 0) 100%)`, // Smooth fade to transparent
                height: '150px',
              }}>
              <Typography
                sx={{
                  textAlign: 'left',
                  marginBottom: '6px',
                  fontWeight: '400',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                }}>
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'left',
                  color: 'text.secondary',
                  fontFamily: 'Poppins, sans-serif',
                }}>
                {item.featureDescription}
              </Typography>
            </Box>
          ))}
          {/* Feature Block */}
        </Box>
      </Box>

      {/* footer section */}
      <Box
        sx={{
          backgroundColor: colors.mistBlue,
          height: '66px',
          position: 'sticky',
          // Fix the footer at the bottom
          borderRadius: '16px 16px 0px 0px',
          bottom: 0, // Ensure it's aligned to the bottom
          width: '100%', // Make sure it spans the entire width
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          handleClick={() => {
            navigate(ROUTE_PATH.SIGN_UP)
          }}
          // isLoading={true}
          ButtonContainerStyle={{
            width: '100%',
            display: 'flex',
            height: '38px',
            justifyContent: 'center',
          }}
          sx={{ width: '80%' }}
          text={"Let's plan your trip"}
          loadinButtonWidth={'50px'}
        />
      </Box>
    </Box>
  )
}

export default Home
