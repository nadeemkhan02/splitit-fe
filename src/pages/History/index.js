import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from '@mui/material'
import DashboardNavBar from '../../components/DashboadrNavBar'
import DashboardFooter from '../../components/DashboardFooter'
import axiosInstance from '../../utils/axios'
import { getTripListApiUrl } from '../../utils/urls'
import { toastMessage } from '../../common/ToastMessage'
import colors from '../../constants/colors'
import { OutlinedButton } from '../../common/OutlinedButton'
import TripDetailsModal from '../../components/TripDetailsModal'
import ExpandMoreIcon from '../../assets/icons/downArrow.svg'
import NoData from '../../assets/icons/emptyFolder.png'
import InfIcon from '../../assets/icons/ifoIcon.png'

const History = () => {
  const userData = JSON.parse(localStorage.getItem('user'))

  const [completedTrip, setCompletedTrip] = useState([])

  const [tripDetailsModalData, setTripDetailsModaldata] = useState({
    isOpen: false,
    tripDetails: {},
  })

  useEffect(() => {
    axiosInstance
      .get(`${getTripListApiUrl}?userId=${userData._id}&isCompleted=${true}`)
      .then((response) => {
        if (response.status === 200) {
          const completedTrip = response.data.filter(
            (trip) => new Date(trip.tripDate) <= new Date()
          )

          setCompletedTrip(completedTrip)
        } else {
          toastMessage('error', response?.data || 'Something went wrong')
        }
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data || 'Something went wrong')
      })
  }, [])

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
        <Box
          sx={{
            height: '70vh',
            overflowY: 'auto',
            p: '20px !important',
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
          {completedTrip?.length ? (
            completedTrip?.map((item, ind) => (
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
      </Box>
      <TripDetailsModal
        openDetailsModal={tripDetailsModalData.isOpen}
        tripDetails={tripDetailsModalData.tripDetails}
        handleClose={() =>
          setTripDetailsModaldata({ isOpen: false, tripDetails: {} })
        }
      />
      <DashboardFooter />
    </>
  )
}

export default History
