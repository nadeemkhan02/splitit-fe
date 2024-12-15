import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import CrossIcon from '../../assets/icons/crossIcon.svg'
import colors from '../../constants/colors'
import CustomButton from '../../common/CustomButton'

const ConfimModal = ({
  openDetailsModal,
  handleClose,
  handleSubmit,
  isLoading,
  isDisabled,
  confirmText,
  confirmBtnText = 'Confirm',
  confirmTextHeading,
}) => {
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
            padding: '0px 10px 0px 0px',
            mb: 1,
          }}>
          <Typography
            id="add-expense-modal-title"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '20px',
            }}>
            {confirmTextHeading}
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
        <Box>{confirmText}</Box>
        <CustomButton
          text={confirmBtnText}
          handleClick={handleSubmit}
          isLoading={isLoading}
          sx={{
            mt: 2,
            width: 'auto',
            float: 'right',
            color: '#fff',
          }}
          disabled={isDisabled}
        />
      </Box>
    </Modal>
  )
}

export default ConfimModal
