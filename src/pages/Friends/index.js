import React, { useEffect, useState } from 'react'
import DashboardNavBar from '../../components/DashboadrNavBar'
import DashboardFooter from '../../components/DashboardFooter'
import { Box, Modal, Typography } from '@mui/material'
import NoData from '../../assets/icons/emptyFolder.png'
import SearchBoxSelect from '../../common/SearchBoxSelect'
import axiosInstance from '../../utils/axios'
import { getUserListAPiUrl, updateFriend } from '../../utils/urls'
import { toastMessage } from '../../common/ToastMessage'
import _ from 'lodash'
import OnScreenLoader from '../../common/OnScreenLoader'

const Friends = () => {
  const [friendList, setFriendList] = useState([])
  const [allFriendList, setAllFriendList] = useState([])
  const [searchFriendValue, setSearchFriendValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [addedFriends, setAddedFriends] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get(`${getUserListAPiUrl}/${user?._id}`)
      .then((response) => {
        if (response.status === 200) {
          const Friends = response.data.friends?.map((item) => ({
            value: item._id,
            label: item.name,
          }))
          setAddedFriends(Friends)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        toastMessage('error', 'Error while fetching user list')
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
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

  return (
    <>
      <DashboardNavBar />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}>
        <Box sx={{ mb: '6px' }}>
          <SearchBoxSelect
            key={addedFriends}
            isMultiSelect={false}
            menuWidth={'580px'}
            value={addedFriends}
            label={'Add Friends'}
            name={'person'}
            autoFormat={false}
            isRequired={false}
            multiple={true}
            onChange={(e) => {
              axiosInstance
                .put(updateFriend, {
                  friendIds: e.map((item) => item?.value),
                  userId: user?._id,
                })
                .then((res) => {
                  console.log(res)
                })
                .catch((err) => {
                  console.log(err)
                })
              setAddedFriends(e)
            }}
            selectionList={[
              ...addedFriends.filter((item) => friendList.includes(item)),
              ...friendList.filter(
                (item) =>
                  !addedFriends.some(
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
        {addedFriends?.length === 0 && !isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}>
            <img style={{ width: '200px' }} src={NoData} alt="friends" />
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '20px' }}>
              No friends added yet
            </Typography>
          </Box>
        )}
      </Box>
      <DashboardFooter />
      <OnScreenLoader IsLoading={isLoading} />
    </>
  )
}

export default Friends
