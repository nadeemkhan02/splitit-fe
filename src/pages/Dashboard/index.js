import React from 'react'
import DashboardNavBar from '../../components/DashboadrNavBar'
import { Box, Typography } from '@mui/material'
import DashboardFooter from '../../components/DashboardFooter'

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
        <Typography>Dashboard</Typography>
      </Box>

      {/* Footer */}
      <DashboardFooter />
    </Box>
  )
}

export default Dashboard
