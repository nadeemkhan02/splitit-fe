import React from 'react'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DashboardNavBar from '../../components/DashboadrNavBar'
import DashboardFooter from '../../components/DashboardFooter'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const Trips = () => {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const tabData = [
    { label: 'Ongoing', index: 0 },
    { label: 'Upcoming', index: 1 },
    { label: 'Past', index: 2 },
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <DashboardNavBar />
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
            aria-label="trips tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'black', // Set the underline color to black
              },
            }}>
            {tabData.map((tab) => (
              <Tab
                key={tab.index}
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  textTransform: 'none',
                  fontSize: '16px',
                }}
                label={tab.label}
                {...a11yProps(tab.index)}
              />
            ))}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography>Ongoing trips content here</Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography>Upcoming trips content here</Typography>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Typography>Past trips content here</Typography>
        </TabPanel>
      </Box>
      <DashboardFooter />
    </>
  )
}

export default Trips
