import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DashboardNavBar from '../../components/DashboadrNavBar'
import DashboardFooter from '../../components/DashboardFooter'
import axiosInstance from '../../utils/axios'
import { getTripListApiUrl } from '../../utils/urls'
import { toastMessage } from '../../common/ToastMessage'
import CustomButton from '../../common/CustomButton'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import colors from '../../constants/colors'
import { OutlinedButton } from '../../common/OutlinedButton'
import { format } from 'date-fns'

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
  const userData = JSON.parse(localStorage.getItem('user'))
  const tabData = [
    { label: 'Ongoing', index: 0 },
    { label: 'Upcoming', index: 1 },
    // { label: 'Past', index: 2 },
  ]
  const [onGoinTrip, setOnGoinTrip] = useState([])
  const [upcomingTrip, setUpcomingTrip] = useState([])

  useEffect(() => {
    console.log('Trip page loaded<<')
    axiosInstance
      .get(`${getTripListApiUrl}?userId=${userData._id}`)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data, '<<')
          const onGpoingTrip = response.data.filter(
            (trip) => new Date(trip.tripDate) <= new Date()
          )
          const upcommingTrip = response.data.filter(
            (trip) => new Date(trip.tripDate) > new Date()
          )
          setOnGoinTrip(onGpoingTrip)
          setUpcomingTrip(upcommingTrip)
        } else {
          toastMessage('error', response?.data || 'Something went wrong')
        }
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data || 'Something went wrong')
        console.log(err, '<<')
      })
  }, [])

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
          <Box
            sx={{
              height: '70vh',
              overflowY: 'auto',
              pr: '4px',
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.primaryLight, // Scrollbar color
                borderRadius: '10px', // Rounded scrollbar edges
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0', // Track color (optional)
              },
            }}>
            {onGoinTrip?.map((item, ind) => (
              <Box
                key={ind}
                sx={{
                  border: `1px solid ${colors.primaryLight}`,
                  padding: '20px',
                  mb: '20px',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pb: '20px',
                  }}>
                  <Typography sx={{ fontFamily: 'Poppins' }}>
                    {item.name}
                  </Typography>
                  <OutlinedButton
                    variant="outlined"
                    sx={{
                      fontFamily: 'Poppins',

                      borderColor: colors.primaryLight,
                    }}>
                    Details
                  </OutlinedButton>
                </Box>
                <CustomButton
                  sx={{ width: '100%' }}
                  text={'Add Your Expence'}
                />
              </Box>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {upcomingTrip.map((trip) => (
            <Box
              key={trip.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '10px',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '400',
                      marginRight: '10px',
                      fontFamily: 'Poppins',
                    }}>
                    {trip.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '400',
                      marginRight: '10px',
                      fontFamily: 'Poppins',
                    }}>
                    {format(new Date(trip.tripDate), 'dd MMM yyyy')}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '400',
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                  }}>
                  {trip.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </TabPanel>
      </Box>
      <DashboardFooter />
    </>
  )
}

export default Trips
