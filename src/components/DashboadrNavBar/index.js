import * as React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material'
import colors from '../../constants/colors'
import { toast } from 'react-toastify'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function DashboardNavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // Function to generate initials from user name
  const getInitials = (name) => {
    const nameParts = name.split(' ')
    const initials = nameParts
      .map((part) => part[0])
      .join('')
      .toUpperCase()
    return initials
  }

  // Replace 'Nadeem Khan' with the actual user name (e.g., from props or context)
  const userName = 'Nadeem Khan'
  const userInitials = getInitials(userName) // Example: NK

  const handleSettingCLick = (setting) => {
    console.log(setting, '<<')
    switch (setting) {
      case 'Profile':
        console.log('Profile')
        break
      case 'Account':
        console.log('Account')
        break
      case 'Dashboard':
        console.log('Dashboard')
        break
      case 'Logout':
        console.log('Logout')
        localStorage.clear()
        window.location.reload()
        toast.success('success', 'Logout Successfully')
        break
      default:
        break
    }
  }

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        '&.MuiAppBar-root': {
          backgroundColor: colors.primaryLight,
          boxShadow: 'none',
        },
      }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 15px',
        }}>
        {/* Left side LOGO */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            fontFamily: 'Poppins',
            fontWeight: 400,
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '26px',
          }}>
          SplitIt
        </Typography>

        {/* User Avatar and Settings Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}>
              <Avatar
                sx={{
                  backgroundColor: 'grey',
                  color: '#fff',
                  width: 40,
                  height: 40,
                  fontSize: '1rem',
                }}>
                {userInitials} {/* Display the user's initials */}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    handleSettingCLick(setting)
                  }}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  )
}

export default DashboardNavBar
