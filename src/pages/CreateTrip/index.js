import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import NavBar from '../../components/NavBar'
import { InputBox, InputField } from '../../common/InputField'
import CustomButton from '../../common/CustomButton'
import axios from 'axios'
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
  const userData = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get(`${getUserListAPiUrl}`)
      .then((response) => {
        if (_.isArray(response?.data) && response?.data?.length > 0) {
          const UserList = response?.data.map((user) => ({
            value: user._id,
            label: user.name,
          }))
          setFriendList(UserList)
          setAllFriendList(UserList)
        }
      })
      .catch((error) => {
        toastMessage('error', 'Error while fetching user list')
      })
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
        newFormDetails.isValidTripDate = new Date(value) > new Date()
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
        tripDate: new Date(
          `${formDetails.tripDate}T00:00:00.000Z`
        ).toISOString(),
      }
      axiosInstance
        .post(addTripApiUrl, payload)
        .then((response) => {
          if (response.status === 200) {
            toastMessage('success', 'Trip created successfully')
            navigate(ROUTE_PATH.TRIPS)
          } else {
            toastMessage('error', response.data)
          }
        })
        .catch((error) => {
          toastMessage('error', error?.response?.data)
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
                getDate(2)
              }}
              onSetDayAfterTomorrow={() => {
                getDate(3)
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
            disabled={!formDetails.isValidForm}
          />
        </form>
      </Box>

      <DashboardFooter />
    </Box>
  )
}

export default CreateTrip
