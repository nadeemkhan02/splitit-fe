import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import colors from '../../constants/colors'
import HistoryLight from '../../assets/icons/historyLight.png'
import TripsLight from '../../assets/icons/tripLight.png'
import FriendsLight from '../../assets/icons/friednsLight.png'
import HistoryDark from '../../assets/icons/historyDark.png'
import TripsDark from '../../assets/icons/tripDark.png'
import FriendsDark from '../../assets/icons/friendsDark.png'
import { ROUTE_PATH } from '../../utils/routes'
import { Box, Typography } from '@mui/material'

const DashboardFooter = () => {
  const location = useLocation() // Get the current URL
  const navigate = useNavigate()
  const footerContaint = [
    {
      title: 'Trips',
      description: 'View all your trips',
      iconLight: TripsLight,
      iconDark: TripsDark,
      link: ROUTE_PATH.TRIPS,
    },
    {
      title: 'Friends',
      description: 'View all your friends',
      iconLight: FriendsLight,
      iconDark: FriendsDark,
      link: ROUTE_PATH.FRIENDS,
    },
    {
      title: 'History',
      description: 'View all your history',
      iconLight: HistoryLight,
      iconDark: HistoryDark,
      link: ROUTE_PATH.HISTORY,
    },
  ]
  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.primaryLight,
          height: '58px',
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '500px',
          borderRadius: '16px 16px 0px 0px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {footerContaint.map((item, ind) => (
          <Box
            key={ind}
            sx={{
              p: '4px 20px 0px 20px',
              width: '33.33%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: ind === 2 ? '16px' : '0px',
              borderTopLeftRadius: ind === 0 ? '16px' : '0px',
              backgroundColor:
                location.pathname === item.link
                  ? colors.primary
                  : colors.primaryLight,
            }}
            onClick={() => {
              navigate(item.link)
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              {/* Render light or dark icon based on current URL */}
              <img
                src={
                  location.pathname === item.link
                    ? item.iconLight
                    : item.iconDark
                }
                alt={`${item.title} icon`}
                style={{ width: '24px', height: '24px' }}
              />
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  pt: '2px',

                  color:
                    location.pathname === item.link
                      ? colors.white
                      : colors.black,
                }}>
                {item.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default DashboardFooter
