import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  InputLabel,
  Menu,
  Stack,
  Typography,
  name,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import colors from '../../constants/colors'
import CrossIcon from '../../assets/icons/crossIcon.svg'
import DownArrow from '../../assets/icons/downArrow.svg'
import EmptyFolder from '../../assets/icons/emptyFolder.png'

// Custom styles using the hex color codes
const useStyles = makeStyles(() => ({
  button: {
    borderColor: colors.primary, // primary color
    color: colors.black, // darker shade for text
    width: '100%', // Button width set to 100%
    display: 'flex',
    justifyContent: 'flex-start', // Left align text
    '&:hover': {
      borderColor: colors.primary, // darker primary on hover
    },
    '&.Mui-disabled': {
      borderColor: '#9e9e9e', // grey color when disabled
      color: '#9e9e9e',
    },
  },
  inputLabel: {
    color: '#002f6c', // dark blue for label
  },
  searchMenuItem: {
    padding: '2px 0px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Poppins !important',
    '&:hover': {
      backgroundColor: '#f1f1f1', // light grey on hover
    },
  },

  scrollBox: {
    maxHeight: '300px',
    overflowY: 'scroll', // Allow scrolling but hide the scrollbar
    scrollBehavior: 'smooth', // Smooth scrolling
    scrollbarWidth: 'none', // For Firefox, hide the scrollbar
    '-ms-overflow-style': 'none', // For IE and Edge, hide the scrollbar

    // For Chrome, Safari, and newer browsers
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in webkit-based browsers
    },
  },
}))

function SearchBoxSelect({
  selectionList,
  placeholder = 'Select', // Default placeholder to 'Select'
  isSelectCompany,
  labelKeys,
  valueKey,
  value = null,
  onChange,
  autoFormat = false,
  name,
  isRequired,
  label = null,
  allowOther = false,
  disabled = false,
  loading = false,
  multiple = false,
  handleSearchClear,
  searchValue,
  handleSearchChange,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedValues, setSelectedValues] = useState(value || [])

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  const handleSelect = (item) => {
    if (multiple) {
      const newValue = selectedValues
        ?.map((i) => i?.value)
        .includes(item?.value)
        ? selectedValues.filter((i) => i?.value !== item?.value)
        : [...selectedValues, item]
      setSelectedValues(newValue)
      onChange(newValue)
    } else {
      setSelectedValues([item])
      onChange(item)
      setOpen(false)
    }
  }

  const isItemSelected = (item) =>
    selectedValues?.map((i) => i?.value).includes(item?.value)

  return (
    <Box sx={{ maxWidth: '500px', position: 'relative' }}>
      {label && (
        <InputLabel
          className={classes.inputLabel}
          required={isRequired}
          disabled={disabled}>
          {label}
        </InputLabel>
      )}
      <Box>
        <Button
          variant="outlined"
          className={classes.button}
          sx={{
            textAlign: 'left',
            color: colors.black,
            justifyContent: 'space-between !important',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: '400',
            height: '44px',
            width: '100%',
            borderRadius: '4px',
            textTransform: 'none',
            borderColor: colors.primary,
            paddingLeft: '14px',
          }}
          onClick={handleToggle}
          disabled={disabled || loading}
          endIcon={
            loading ? (
              <CircularProgress size={20} />
            ) : (
              <img src={DownArrow} alt="down arrow" />
            )
          }>
          {selectedValues.length > 0
            ? multiple
              ? `${selectedValues.length} ${name} added`
              : selectedValues.map((item) => item[labelKeys]).join(', ')
            : placeholder}
        </Button>
        {multiple && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: '10px', flexWrap: 'wrap' }}>
            {selectedValues.map((item) => (
              <Chip
                label={item?.label}
                // onClick={() => handleSelect(item)}
                sx={{
                  fontFamily: 'Poppins',
                  marginBottom: '6px !important',
                  backgroundColor: colors.iceBlue,
                }}
                onDelete={() => {
                  handleSelect(item)
                }}
                deleteIcon={
                  <img src={CrossIcon} alt="delete" style={{ width: '16px' }} />
                }
              />
            ))}
          </Stack>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        sx={{
          width: '100%', // Set the menu width to 100%
          '& .MuiMenu-paper': {
            width: '100%',
            borderRadius: '6px',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          },
          '& .MuiMenuItem-root': {
            padding: '4px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f1f1f1', // light grey on hover
            },
          },
        }}
        open={open}
        onClose={(event) => {
          // Prevent closing if you click on specific elements
          // if (event.target.closest('.your-selector')) {
          //   return
          // }
          setOpen(false)
        }}
        disableAutoFocusItem
        disableEnforceFocus>
        <Box sx={{ p: '0px 6px' }}>
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            disabled={disabled}
          />
        </Box>
        <Box className={classes.scrollBox}>
          {selectionList?.length ? (
            selectionList.map((item) => (
              <Box
                key={item[valueKey]}
                className={`${classes.searchMenuItem} ${
                  isItemSelected(item) ? classes.selectedItem : ''
                }`}
                onClick={() => handleSelect(item)}>
                {multiple && <Checkbox checked={isItemSelected(item)} />}
                <Typography sx={{ fontFamily: 'Poppins' }}>
                  {item[labelKeys]}
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
                flexDirection: 'column',
              }}>
              <img
                src={EmptyFolder}
                style={{ width: '40px', marginBottom: '4px' }}
                alt="empty folder"
              />
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                }}>
                No data found
              </Typography>
            </Box>
          )}
        </Box>
      </Menu>
    </Box>
  )
}

export default SearchBoxSelect
