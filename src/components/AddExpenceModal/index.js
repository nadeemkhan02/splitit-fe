import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CrossIcon from '../../assets/icons/crossIcon.svg'
import MoneyIcon from '../../assets/icons/money.png'
import CustomButton from '../../common/CustomButton'
import { InputLabel, MenuItem } from '@mui/material'
import { InputField } from '../../common/InputField'
import axiosInstance from '../../utils/axios'
import colors from '../../constants/colors'
import { toastMessage } from '../../common/ToastMessage'
import _, { set } from 'lodash'
import SearchBoxSelect from '../../common/SearchBoxSelect'
import { addExpenseApiUrl } from '../../utils/urls'

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

export default function AddExpenseModal({
  open,
  handleClose,
  tripDetails,
  onSuccessAction,
}) {
  const userDeatails = JSON.parse(localStorage.getItem('user'))
  const [userList, setUserList] = useState([])
  const [formDetails, setFormDetails] = useState({
    amount: '',
    title: '',
    description: '',
    expenseType: 'Other',
    sharedAmong: [],
    isValidAmount: true,
    isValidTitle: true,
    isValidForm: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const clearFormDetails = () => {
    setFormDetails({
      amount: '',
      title: '',
      description: '',
      expenseType: 'Other',
      paidBy: '',
      sharedAmong: [], // Ensure this is reset here
      isValidAmount: true,
      isValidTitle: true,
      isValidForm: false,
    })
  }

  useEffect(() => {
    if (!_.isEmpty(tripDetails) && open) {
      const TripParticipants = tripDetails?.tripParticipants?.length
        ? tripDetails.tripParticipants
            ?.filter((item) => item?._id !== userDeatails?._id)
            ?.map((item) => ({
              value: item._id,
              label: item.name,
            }))
        : []
      setUserList(TripParticipants)
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        sharedAmong: TripParticipants,
      }))
    } else {
      clearFormDetails() // Directly clear form when modal closes
    }
  }, [open, tripDetails])

  const expenseTypes = ['Food', 'Accommodation', 'Transportation', 'Other']

  const validateForm = (details) => {
    return (
      parseFloat(details.amount) > 0 &&
      details.title.trim().length >= 3 &&
      details.sharedAmong.length >= 1
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target // Get the name and value of the input field
    const FormDetails = { ...formDetails }
    switch (name) {
      case 'amount':
        FormDetails.isValidAmount = value > 0
        break
      case 'title':
        FormDetails.isValidTitle = value.trim().length >= 3
        break
      default:
        break
    }
    if (name === 'amount') {
      FormDetails[name] =
        value === '' || (!isNaN(Number(value)) && value !== null)
          ? value
          : FormDetails[name]
    } else {
      FormDetails[name] = value
    }
    FormDetails.isValidForm = validateForm(FormDetails)
    setFormDetails(FormDetails)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formDetails.isValidForm) {
      toastMessage('error', 'Please fill in all required fields.')
      return
    }
    const payload = {
      trip: tripDetails._id,
      amount: parseFloat(formDetails.amount),
      title: formDetails.title.trim(),
      description: formDetails.description.trim(),
      expenseType: formDetails.expenseType.toLocaleLowerCase(),
      paidBy: userDeatails._id,
      sharedAmong: [
        ...formDetails.sharedAmong?.map((item) => item.value),
        userDeatails._id,
      ],
    }
    setIsLoading(true)
    try {
      axiosInstance
        .post(addExpenseApiUrl, payload)
        .then((response) => {
          if (response.status === 200) {
            toastMessage('success', 'Expense added successfully')
            handleClose() // Close modal on success
            setIsLoading(false)
            onSuccessAction()
          }
        })
        .catch((error) => {
          toastMessage('error', error?.response?.data)
          setIsLoading(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      toastMessage('error', 'Error adding expense')
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={open}
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
            Add New Expense
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
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: '6px' }}>
              <InputField
                label="Amount"
                name="amount"
                isRequired={true}
                value={formDetails.amount}
                onChange={handleChange}
                isValid={formDetails.isValidAmount}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '34px !important',
                  },
                }}
                inputAdornmentComp={
                  <img style={{ width: '38px' }} src={MoneyIcon} alt="money" />
                }
                message={'Please enter a valid amount'}
              />
            </Box>
            <Box sx={{ mb: '6px' }}>
              <InputField
                label="Title"
                name="title"
                type="text"
                isRequired={true}
                value={formDetails.title}
                onChange={handleChange}
                isValid={formDetails.isValidTitle}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '34px !important',
                  },
                }}
                message={'Please enter a valid title'}
              />
            </Box>
            <Box sx={{ mb: '6px' }}>
              <InputField
                label="Description"
                name="description"
                type="text"
                isValid={true}
                value={formDetails.description}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '34px !important',
                  },
                }}
              />
            </Box>
            <Box sx={{ mb: '14px' }}>
              <InputLabel>Expense Type</InputLabel>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start', // Align items to the left
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1, // Adds spacing between boxes
                }}>
                {expenseTypes.map((type) => (
                  <Box
                    key={type}
                    onClick={() =>
                      setFormDetails({ ...formDetails, expenseType: type })
                    }
                    sx={{
                      cursor: 'pointer',
                      padding: '4px 8px',
                      border: `1px solid ${colors.primaryLight}`,
                      borderRadius: '8px',
                      backgroundColor:
                        formDetails.expenseType === type
                          ? colors.primary
                          : 'transparent',
                      color:
                        formDetails.expenseType === type
                          ? '#fff'
                          : 'text.primary',
                      '&:hover': {
                        backgroundColor:
                          formDetails.expenseType === type
                            ? 'primary.dark'
                            : 'grey.400',
                      },
                    }}>
                    <Typography
                      sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                      {type}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ mb: '6px' }}>
              <SearchBoxSelect
                key={formDetails?.sharedAmong}
                isMultiSelect={false}
                menuWidth={'580px'}
                height={'34px'}
                value={formDetails.sharedAmong}
                label={'Add Friends'}
                name={'person'}
                isSearchable={false}
                autoFormat={false}
                isRequired={true}
                multiple={true}
                onChange={(e) => {
                  const newFormDetails = { ...formDetails }
                  if (e.length < 1) {
                    toastMessage('error', 'Please select atleast 1 friends')
                  }
                  newFormDetails.sharedAmong = e
                  newFormDetails.isValidForm = validateForm(newFormDetails)
                  setFormDetails(newFormDetails)
                }}
                selectionList={userList?.filter(
                  (item) => item.value !== userDeatails._id
                )}
                searchType={'Add Friends'}
                placeholder={'Select friends'}
                labelKeys={'label'}
                valueKey={'value'}
              />
            </Box>
            <CustomButton
              text="Add Expense"
              onClick={handleSubmit}
              isLoading={isLoading}
              sx={{
                mt: 2,
                backgroundColor: colors.primary,
                width: '100%',
                color: '#fff',
                '&:hover': { backgroundColor: colors.primaryDark },
              }}
              disabled={!formDetails.isValidForm}
            />
          </form>
        </Box>
      </Box>
    </Modal>
  )
}
