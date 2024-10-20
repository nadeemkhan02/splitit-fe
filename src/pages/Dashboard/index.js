import React from 'react'
import DashboardNavBar from '../../components/DashboadrNavBar'
import { Box, Typography } from '@mui/material'
import DashboardFooter from '../../components/DashboardFooter'
import colors from '../../constants/colors'

const Dashboard = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        maxWidth: '500px', // Constrain to a certain width for demo purposes
        margin: '0 auto', // Center the container
      }}>
      <DashboardNavBar />
      <Box sx={{ pb: '80px' }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: '20px',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '24px',
              color: colors.black,
              fontWeight: '300',
              display: 'block',
            }}>
            Dashboard Analytics
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '20px',
              color: colors.primary,
              fontWeight: '300',
              display: 'block',
            }}>
            (Comming soon)
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <DashboardFooter />
    </Box>
  )
}

export default Dashboard
