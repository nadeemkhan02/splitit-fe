import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import NavBar from '../../components/NavBar'
import { InputBox, InputField } from '../../common/InputField'
import CustomButton from '../../common/CustomButton'
import { toastMessage } from '../../common/ToastMessage'
import colors from '../../constants/colors'
import DashboardFooter from '../../components/DashboardFooter'
import SearchBoxSelect from '../../common/SearchBoxSelect'
import axiosInstance from '../../utils/axios'
import { addTripApiUrl, getUserListAPiUrl } from '../../utils/urls'
import _ from 'lodash'
import DashboardNavBar from '../../components/DashboadrNavBar'
import { ROUTE_PATH } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import { isValidPastDate } from '../../utils/isValidPastDate'

const CreateTrip = () => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    description: '',
    tripDate: new Date().toISOString().split('T')[0], // Get today's date
    tripStatus: '',
    friends: [],
    nonPlatformParticipants: '',
    isValidName: true,
    isValifFriends: true,
    isValidTripDate: true,
    isValidForm: false,
  })
  const [friendList, setFriendList] = useState([])
  const [allFriendList, setAllFriendList] = useState([])
  const [searchFriendValue, setSearchFriendValue] = useState('')
  const [isFormLoading, setIsFormLoading] = useState(false)
  const userData = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    axiosInstance
      .get(`${getUserListAPiUrl}/${user?._id}`)
      .then((response) => {
        if (response.status === 200) {
          const Friends = response.data.friends?.map((item) => ({
            value: item._id,
            label: item.name,
          }))
          setFriendList(Friends)
          setAllFriendList(Friends)
        }
      })
      .catch((error) => {
        toastMessage('error', 'Error while fetching user list')
      })
      .finally(() => {})
  }, [])

  const getDate = (day) => {
    const date = new Date()
    date.setDate(date.getDate() + day)
    const formattedDate = date.toISOString().split('T')[0]

    setFormDetails((prevDetails) => ({
      ...prevDetails,
      tripDate: formattedDate,
      isValidTripDate: true,
    }))
  }

  const validateForm = (details) => {
    return (
      details.isValidName &&
      details.isValidTripDate &&
      details.friends.length > 0
    )
  }

  const handleChange = (e) => {
    const newFormDetails = { ...formDetails }
    const { name, value } = e.target
    // Validate fields
    switch (name) {
      case 'name':
        newFormDetails.isValidName = value.trim().length > 0
        break
      case 'tripDate':
        newFormDetails.isValidTripDate = isValidPastDate(value)
        break
      default:
        break
    }
    newFormDetails[name] = value
    newFormDetails.isValidForm = validateForm(newFormDetails)
    setFormDetails(newFormDetails)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const addedFriends = formDetails.friends.map((friend) => {
      return friend.value
    })
    if (formDetails.isValidForm) {
      const payload = {
        name: formDetails.name.trim(),
        description: formDetails.description.trim(),
        tripCreator: userData._id,
        tripParticipants: [
          ...addedFriends,
          ...(addedFriends.includes(userData._id) ? [] : [userData._id]),
        ],
        tripDate: new Date(formDetails.tripDate).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        }),
      }
      setIsFormLoading(true)
      axiosInstance
        .post(addTripApiUrl, payload)
        .then((response) => {
          if (response.status === 200) {
            toastMessage('success', 'Trip created successfully')
            navigate(ROUTE_PATH.TRIPS)
            setIsFormLoading(false)
          } else {
            toastMessage('error', response.data)
            setIsFormLoading(false)
          }
        })
        .catch((error) => {
          toastMessage('error', error?.response?.data)
          setIsFormLoading(false)
        })
        .finally(() => {
          setIsFormLoading(false)
        })
    } else {
    }
  }

  return (
    <Box>
      <DashboardNavBar />
      <Box sx={{ p: '20px', marginBottom: '60px' }}>
        <Typography
          component="div"
          sx={{
            mb: '18px',
            fontWeight: 400,
            fontFamily: 'Poppins',
            fontSize: '24px',
          }}>
          Create Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Trip Name */}
          <Box sx={{ mb: '14px' }}>
            <InputField
              label={'Trip Name'}
              name="name"
              type="text"
              isRequired={true}
              value={formDetails.name}
              onChange={handleChange}
              isValid={formDetails.isValidName}
              message={'Enter a valid name'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '44px !important',
                },
              }}
            />
          </Box>
          <Box sx={{ mb: '6px' }}>
            <SearchBoxSelect
              isMultiSelect={false}
              menuWidth={'580px'}
              value={formDetails.friends}
              label={'Add Friends'}
              name={'person'}
              autoFormat={false}
              isRequired={true}
              multiple={true}
              isCreateTripPage={true}
              onChange={(e) => {
                const newFormDetails = { ...formDetails }
                newFormDetails.friends = e
                newFormDetails.isValidForm = validateForm(newFormDetails, e)
                setFormDetails(newFormDetails)
              }}
              selectionList={[
                ...formDetails.friends.filter((item) =>
                  friendList.includes(item)
                ),
                ...friendList.filter(
                  (item) =>
                    !formDetails.friends.some(
                      (selected) => selected.value === item.value
                    )
                ),
              ]}
              searchType={'Add Friends'}
              placeholder={'Select friends'}
              labelKeys={'label'}
              valueKey={'value'}
              handleSearchClear={() => {
                setFriendList(allFriendList)
                setSearchFriendValue('')
              }}
              searchValue={searchFriendValue}
              handleSearchChange={(val) => {
                setSearchFriendValue(val.target.value)
                const filteredList = allFriendList.filter((item) =>
                  item.label
                    .toLowerCase()
                    .includes(val.target.value.toLowerCase())
                )
                setFriendList(filteredList)
              }}
            />
          </Box>
          {/* Trip Description */}
          <Box sx={{ mb: '0px' }}>
            <InputBox
              label={'Description'}
              name="description"
              type="text"
              value={formDetails.description}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '44px !important',
                },
              }}
            />
          </Box>

          {/* Trip Date */}
          <Box sx={{ mb: '14px' }}>
            <InputField
              label={'Trip Date'}
              name="tripDate"
              type="date"
              onSetTomorrow={() => {
                getDate(1)
              }}
              onSetDayAfterTomorrow={() => {
                getDate(2)
              }}
              value={formDetails.tripDate}
              onChange={handleChange}
              isValid={formDetails.isValidTripDate}
              message={'Select a valid future date'}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '44px !important',
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <CustomButton
            handleClick={handleSubmit}
            text={'Create Trip'}
            loadinButtonWidth={'100%'}
            sx={{
              height: '44px',
              width: '100%',
              mt: '20px',
              backgroundColor: colors.primary,
              color: '#fff',
              '&:hover': { backgroundColor: colors.primaryDark },
            }}
            disabled={!formDetails.isValidForm || isFormLoading}
            isLoading={isFormLoading}
          />
        </form>
      </Box>

      <DashboardFooter />
    </Box>
  )
}

export default CreateTrip
