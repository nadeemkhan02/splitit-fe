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
import { completeTripApiUrl, getTripListApiUrl } from '../../utils/urls'
import { toastMessage } from '../../common/ToastMessage'
import CustomButton from '../../common/CustomButton'
import NoData from '../../assets/icons/emptyFolder.png'
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
import ExpandMoreIcon from '../../assets/icons/downArrow.svg'
import InfIcon from '../../assets/icons/ifoIcon.png'
import TripDetailsModal from '../../components/TripDetailsModal'
import ConfimModal from '../../components/ConfimModal'
import OnScreenLoader from '../../common/OnScreenLoader'

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
  const [isLoading, setIsLoading] = useState(true)
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
  const [isTripEndConfirmData, setIsTripEndConfirmData] = useState({
    isOpen: false,
    tripId: '',
  })
  const [tripDetailsModalData, setTripDetailsModaldata] = useState({
    isOpen: false,
    tripDetails: {},
  })
  const [refershTripListToggel, setRefershTripListToggel] = useState(false)

  const refershTripList = () => {
    setRefershTripListToggel(!refershTripListToggel)
  }
  const handleOpen = (tripDetails) => {
    setTripDetails(tripDetails)
    setModalOpen(true)
  }
  const handleClose = () => setModalOpen(false)

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get(`${getTripListApiUrl}?userId=${userData._id}&isCompleted=${false}`)
      .then((response) => {
        if (response.status === 200) {
          const onGpoingTrip = response.data.filter(
            (trip) => new Date(trip.tripDate) <= new Date() && !trip.isCompleted
          )
          const upcommingTrip = response.data.filter(
            (trip) => new Date(trip.tripDate) > new Date()
          )

          setOnGoinTrip(onGpoingTrip)
          setUpcomingTrip(upcommingTrip)
          setIsLoading(false)
        } else {
          toastMessage('error', response?.data || 'Something went wrong')
          setIsLoading(false)
        }
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data || 'Something went wrong')
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [refershTripListToggel])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleCompleteTrip = () => {
    axiosInstance
      .put(`${completeTripApiUrl}/${isTripEndConfirmData.tripId}`)
      .then((response) => {
        if (response.status === 200) {
          toastMessage('success', 'Trip completed successfully')
          setIsTripEndConfirmData({ isOpen: false, tripId: '' })
          refershTripList()
        } else {
          toastMessage('error', response?.data || 'Something went wrong')
        }
      })
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
            {onGoinTrip?.length ? (
              onGoinTrip?.map((item, ind) => (
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
                    <Typography sx={{ fontFamily: 'Poppins', width: '30%' }}>
                      {item.name}
                    </Typography>
                    <Box>
                      <OutlinedButton
                        variant="outlined"
                        onClick={() => {
                          setIsTripEndConfirmData({
                            isOpen: true,
                            tripId: item._id,
                          })
                        }}
                        sx={{
                          fontFamily: 'Poppins',
                          borderColor: colors.danger,
                          color: colors.danger,
                          minWidth: '100px',
                          marginRight: '10px',
                        }}>
                        End Trip
                      </OutlinedButton>
                      <OutlinedButton
                        variant="outlined"
                        onClick={() => {
                          setTripDetailsModaldata({
                            isOpen: true,
                            tripDetails: item,
                          })
                        }}
                        sx={{
                          fontFamily: 'Poppins',
                          borderColor: colors.primaryLight,
                        }}>
                        Details
                      </OutlinedButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pb: '10px',
                    }}>
                    <Box>
                      <Typography
                        sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                        Trip Expence :{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {calculateTotalAmount(item.expenses)}₹
                        </span>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
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

                  <CustomButton
                    sx={{ width: '100%' }}
                    text={'Add Your Expence'}
                    handleClick={() => {
                      handleOpen(item)
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '55vh',
                  width: '100%',
                  flexDirection: 'column',
                }}>
                <img alt="notrip" style={{ width: '200px' }} src={NoData} />
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    color: colors.black,
                    textAlign: 'center',
                    mt: '20px',
                  }}>
                  You have no ongoing trips
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {upcomingTrip?.length ? (
            upcomingTrip.map((trip) => (
              <Box
                key={trip.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '15px',
                  marginBottom: '15px',
                  border: `1px solid ${colors.primaryLight}`,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: colors.white,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: 'Poppins, sans-serif',
                      color: colors.black,
                    }}>
                    {trip.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '400',
                      fontFamily: 'Poppins, sans-serif',
                      color: colors.greyDark,
                    }}>
                    {format(new Date(trip.tripDate), 'dd MMM yyyy')}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Poppins, sans-serif',
                    color: colors.grey,
                    marginBottom: '10px',
                  }}>
                  {trip.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <CustomButton
                    text="View Details"
                    sx={{
                      mt: 2,
                      backgroundColor: colors.primary,
                      width: '100%',
                      color: '#fff',
                      '&:hover': { backgroundColor: colors.primaryDark },
                    }}
                    disabled={true}
                  />
                </Box>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '55vh',
                width: '100%',
                flexDirection: 'column',
              }}>
              <img alt="notrip" style={{ width: '200px' }} src={NoData} />
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  color: colors.black,
                  textAlign: 'center',
                  mt: '20px',
                }}>
                You have no upcoming trips
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Box>
      <AddExpenseModal
        open={isModalOpen}
        handleClose={handleClose}
        tripDetails={tripDetails}
        onSuccessAction={() => {
          refershTripList()
        }}
      />
      <TripDetailsModal
        openDetailsModal={tripDetailsModalData.isOpen}
        tripDetails={tripDetailsModalData.tripDetails}
        handleClose={() =>
          setTripDetailsModaldata({ isOpen: false, tripDetails: {} })
        }
      />
      <ConfimModal
        openDetailsModal={isTripEndConfirmData.isOpen}
        handleClose={() =>
          // setTripDetailsModaldata({ isConfirmOpen: false, tripDetails: {} })
          setIsTripEndConfirmData({ isOpen: false, tripId: '' })
        }
        handleSubmit={handleCompleteTrip}
        confirmTextHeading={'Confirm End Trip'}
        // isLoading={tripDetailsModalData.isLoading}
        // isDisabled={tripDetailsModalData.isDisabled}
        confirmText={'Are you sure you want to end this trip?'}
      />
      <DashboardFooter />
      <OnScreenLoader IsLoading={isLoading} />
    </>
  )
}

export default Trips
