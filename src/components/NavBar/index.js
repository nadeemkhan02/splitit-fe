import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { OutlinedButton } from '../../common/OutlinedButton'
import CustomButton from '../../common/CustomButton'
import colors from '../../constants/colors'
import { ROUTE_PATH } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo/mainLogo.png'

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{
          '&.MuiAppBar-root': {
            backgroundColor: colors.primaryLight,
            boxShadow: 'none',
          },
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ml: '-4px',
          }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={() => {
              navigate(ROUTE_PATH.Home)
            }}>
            <img
              src={Logo}
              alt="Split It"
              style={{ width: '36px', marginRight: '6px' }}
            />
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'Poppins',
                fontWeight: '500',
                fontSize: '22px',
              }}>
              SplitIt
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OutlinedButton
              variant="outlined"
              color="inherit"
              onClick={() => {
                navigate(ROUTE_PATH.SIGN_IN)
              }}
              sx={{ fontFamily: 'Poppins', mr: 1 }}>
              Log in
            </OutlinedButton>
            <CustomButton
              handleClick={() => {
                navigate(ROUTE_PATH.SIGN_UP)
              }}
              // isLoading={true}
              text={'Sign up'}
              loadinButtonWidth={'50px'}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
