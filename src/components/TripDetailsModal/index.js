import { Avatar, Box, Chip, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { calculateFinalSettlement } from '../../utils/calculateFinalSettlement'
import CrossIcon from '../../assets/icons/crossIcon.svg'
import NoData from '../../assets/icons/emptyFolder.png'
import colors from '../../constants/colors'
import Profile from '../../assets/icons/profile.png'

const TripDetailsModal = ({ openDetailsModal, tripDetails, handleClose }) => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={openDetailsModal}
      onClose={() => {
        handleClose()
      }}
      aria-labelledby="add-expense-modal-title"
      aria-describedby="add-expense-modal-description">
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 14px 0px 14px',
            mb: 1,
          }}>
          <Typography
            id="add-expense-modal-title"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '20px',
            }}>
            Trip Details
          </Typography>
          <img
            src={CrossIcon}
            alt="close"
            onClick={() => {
              handleClose()
            }}
            style={{
              cursor: 'pointer',
              marginTop: '-36px',
              marginRight: '-26px',
            }}
          />
        </Box>
        <Box
          sx={{
            maxHeight: '500px',
            p: 2,
            pt: 0,
            overflowY: 'scroll', // Allow scrolling but hide the scrollbar
            scrollBehavior: 'smooth', // Smooth scrolling
            scrollbarWidth: 'none', // For Firefox, hide the scrollbar
            '-ms-overflow-style': 'none', // For IE and Edge, hide the scrollbar
            // For Chrome, Safari, and newer browsers
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
          <Box>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: '500',
                mb: '10px',
              }}>
              Trip Creator
            </Typography>
            <Chip
              avatar={
                <Avatar alt={tripDetails?.tripCreator?.name} src={Profile} />
              }
              label={tripDetails?.tripCreator?.name}
              variant="outlined"
              sx={{
                fontFamily: 'Poppins',
                marginBottom: '6px !important',
                backgroundColor: colors.iceBlue,
                color: colors.black,
                mr: '4px',
              }}
            />
          </Box>
          <Box sx={{ mt: '20px' }}>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: '500',
                mb: '10px',
              }}>
              Trip Member
            </Typography>
            {tripDetails?.tripParticipants?.map((item) => (
              <Chip
                sx={{
                  fontFamily: 'Poppins',
                  marginBottom: '6px !important',
                  backgroundColor: colors.iceBlue,
                  color: colors.black,
                  mr: '4px',
                }}
                label={item?.name}
                color="primary"
              />
            ))}
          </Box>
          <Box sx={{ mb: '20px', mt: '20px' }}>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: '500',
              }}>
              Final Settlement:
              <Typography
                component="div"
                sx={{ fonrFamily: 'Poppins', fontSize: '14px', mt: '10px' }}>
                {calculateFinalSettlement(tripDetails)?.length ? (
                  <div>
                    {calculateFinalSettlement(tripDetails)?.map(
                      (settlement, index) => {
                        const amount = settlement.amount.toFixed(2)
                        const fromLabel =
                          settlement?.fromId === userData._id ? (
                            <span style={{ color: colors.primary }}>You</span>
                          ) : (
                            <span style={{ color: colors.primary }}>
                              {settlement.from}
                            </span>
                          )
                        const toLabel =
                          settlement?.toId === userData._id ? (
                            <span style={{ color: colors.primary }}>you</span>
                          ) : (
                            <span style={{ color: colors.primary }}>
                              {settlement.to}
                            </span>
                          )

                        return (
                          <div key={index}>
                            {fromLabel} gives{' '}
                            <span style={{ color: colors.success }}>
                              ₹{amount}
                            </span>{' '}
                            to {toLabel}
                          </div>
                        )
                      }
                    )}
                  </div>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: 'column',
                    }}>
                    <img
                      style={{ width: '100px' }}
                      src={NoData}
                      alt="friends"
                    />
                    <Typography
                      sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
                      No Settelment Yet
                    </Typography>
                  </Box>
                )}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default TripDetailsModal
