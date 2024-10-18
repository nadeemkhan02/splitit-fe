import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { OutlinedButton } from '../../common/OutlinedButton'
import CustomButton from '../../common/CustomButton'
import colors from '../../constants/colors'
import { ROUTE_PATH } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'

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
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Poppins' }}>
            SplitIt
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
