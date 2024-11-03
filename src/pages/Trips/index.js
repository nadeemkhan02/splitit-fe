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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from '@mui/material'
import colors from '../../constants/colors'
import { OutlinedButton } from '../../common/OutlinedButton'
import { format } from 'date-fns'
import AddExpenseModal from '../../components/AddExpenceModal'
import { calculateFinalSettlement } from '../../utils/calculateFinalSettlement'
import ExpandMoreIcon from '../../assets/icons/downArrow.svg'
import InfIcon from '../../assets/icons/ifoIcon.png'

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
  const [tripDetails, setTripDetails] = useState({})
  const [isModalOpen, setModalOpen] = useState(false)
  const handleOpen = (tripDetails) => {
    console.log('open')
    setTripDetails(tripDetails)
    setModalOpen(true)
  }
  const handleClose = () => setModalOpen(false)

  useEffect(() => {
    axiosInstance
      .get(`${getTripListApiUrl}?userId=${userData._id}`)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
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

  function calculateTotalAmount(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }
  function calculateTotalAmountPaidBy(expenses, userId) {
    return expenses
      .filter((expense) => expense.paidBy._id === userId) // Filter expenses paid by the specified user
      .reduce((total, expense) => total + expense.amount, 0) // Sum up the amounts
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: '10px',
                  }}>
                  <Box>
                    <Typography sx={{ fontStyle: 'Poppins', fontSize: '14px' }}>
                      Trip Expence :{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {calculateTotalAmount(item.expenses)}₹
                      </span>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontStyle: 'Poppins', fontSize: '14px' }}>
                      Your Expence :{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {calculateTotalAmountPaidBy(
                          item.expenses,
                          userData._id
                        )}
                        ₹
                      </span>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mb: '20px' }}>
                  <Accordion
                    sx={{
                      boxShadow: 'none', // Remove shadow if needed
                    }}>
                    <AccordionSummary
                      expandIcon={<img src={ExpandMoreIcon} alt="expand" />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                        fontFamily: 'Poppins, sans-serif', // Set font family
                        backgroundColor: colors.iceBlue, // Change background color
                      }}>
                      Expenses ({item.expenses.length})
                    </AccordionSummary>
                    <AccordionDetails>
                      {React.Children.toArray(
                        item.expenses.map((expense, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              padding: '10px 0px',
                              flexDirection: 'row',
                              alignItems: 'start',
                              justifyContent: 'space-between',

                              width: '100%',
                              marginBottom: '10px',
                              borderBottom: `1px solid ${colors.primaryLight}`,
                            }}>
                            <Box
                              sx={{
                                width: '60%',
                                elipsis: 'true',
                              }}>
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  marginRight: '10px',
                                  fontFamily: 'Poppins',
                                }}>
                                {expense.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  marginRight: '10px',
                                  fontFamily: 'Poppins',
                                }}>
                                {expense.description}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                width: '40%',
                              }}>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  marginRight: '10px',
                                  fontFamily: 'Poppins',
                                }}>
                                Amount:{' '}
                                <span style={{ color: colors.primary }}>
                                  {expense.amount}₹
                                </span>
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  marginRight: '10px',
                                  fontFamily: 'Poppins',
                                }}>
                                Paid By:{' '}
                                <span style={{ color: colors.primary }}>
                                  {expense.paidBy.name}
                                </span>
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'start',
                                }}>
                                {' '}
                                <Typography
                                  sx={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    marginRight: '10px',
                                    fontFamily: 'Poppins',
                                  }}>
                                  Shared Among:
                                </Typography>
                                <Tooltip title="Delete">
                                  <img
                                    src={InfIcon}
                                    style={{ width: '16px' }}
                                    alt="group"
                                  />
                                </Tooltip>
                              </Box>
                            </Box>
                          </Box>
                        ))
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>

                {/* <Box sx={{ mb: '20px' }}>
                  <Typography
                    sx={{
                      fontStyle: 'Poppins',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}>
                    Final Settlement:
                    <Typography
                      component="div"
                      sx={{ fonrFamily: 'Poppins', fontSize: '14px' }}>
                      {calculateFinalSettlement(item)
                        ?.map((settlement) => {
                          const amount = settlement.amount.toFixed(2)
                          console.log(settlement)
                          return `${
                            settlement?.fromId === userData._id
                              ? 'you'
                              : settlement.from
                          } gives ₹${amount} to ${
                            settlement?.toId === userData._id
                              ? 'you'
                              : settlement.to
                          }`
                        })
                        .map((sentence, index) => (
                          <div key={index}>{sentence}</div>
                        ))}
                    </Typography>
                  </Typography>
                </Box> */}
                <CustomButton
                  sx={{ width: '100%' }}
                  text={'Add Your Expence'}
                  handleClick={() => {
                    handleOpen(item)
                  }}
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
      <AddExpenseModal
        open={isModalOpen}
        handleClose={handleClose}
        tripDetails={tripDetails}
      />
      <DashboardFooter />
    </>
  )
}

export default Trips
