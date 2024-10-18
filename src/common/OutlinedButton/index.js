import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const OutlinedButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    width: '87px',
    height: '34px',
    fontSize: '14px',
    fontFamily: 'Poppins',
    textTransform: 'none',
  },
}))
