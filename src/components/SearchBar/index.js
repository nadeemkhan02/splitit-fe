/** @format */

import { Box, IconButton } from '@mui/material'
import React from 'react'
import CrossIcon from '../../assets/icons/crossIcon.svg'
import Search from '../../assets/icons/search.svg'
import { InputField } from '../../common/InputField'

function SearchBar({
  value,
  onChange,
  placeholder,
  isValid,
  onClear,
  style,
  disabled = false,
  onBlur,
}) {
  return (
    <Box>
      <InputField
        value={value}
        style={style}
        name="search"
        id="search-field"
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '40px !important',
          },
        }}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        isLabel={false}
        isValid={true}
        inputAdornmentComp={
          value === '' ? (
            <img src={Search} alt="search" />
          ) : (
            <IconButton onClick={onClear} sx={{ p: '0px 8px' }}>
              <img src={CrossIcon} alt="clear" />
            </IconButton>
          )
        }
      />
    </Box>
  )
}

export default SearchBar
