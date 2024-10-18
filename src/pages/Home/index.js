import React from 'react'
import { motion } from 'framer-motion'
import LeftPartImage from '../../assets/images/leftPartBill.png'
import RightPartImage from '../../assets/images/rightPartBill.png'
import NavBar from '../../components/NavBar'
import { Box, Typography } from '@mui/material'
import colors from '../../constants/colors'

const Home = () => {
  const splitText = 'Split It'.split('')

  return (
    <Box>
      {/* Header */}
      <NavBar />
      <Box sx={{ p: 1 }}>
        {/* descriptipion text */}
        <Box>
          <Typography
            sx={{
              fontSize: '1.6rem',
              m: '1rem 0',
              textAlign: 'center',
              color: '#4a4a4a',
              p: '20px 6px',
              fontFamily: 'Poppins',
            }}>
            SplitIt is a comprehensive app designed to simplify group trip
            planning and expense management, making travel hassle-free and
            enjoyable.
          </Typography>
        </Box>
        {/* Motion Images */}
        <Box>
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
                top: 0,
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
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '2.7rem',
                  fontWeight: 'bold',
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
                  marginTop: '-2px',
                }}>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: '#4a4a4a',
                    textAlign: 'center',
                    marginTop: '2px',
                    fontWeight: '300',
                  }}>
                  <span style={{ color: colors.primary }}>Get Started!</span>
                  <br /> It’s{' '}
                  <span style={{ color: colors.darkBlue }}>Free</span>, Its{' '}
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
      </Box>
    </Box>
  )
}

export default Home
