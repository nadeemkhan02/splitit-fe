import React from 'react'
import LoadingState from '../Loader'
import { Button, Typography } from '@mui/material'
import colors from '../../constants/colors.js'
// import { themePalette } from '../../constants/theme/colors'

const CustomButton = ({
  text,
  handleClick,
  disabled,
  style,
  variant,
  isValidCredentials,
  errorMessage,
  className,
  innerRef,
  isLoading,
  btnVariant,
  textStyle,
  color,
  sx,
  name,
  loadinButtonWidth,
}) => {
  return (
    <div>
      <Button
        aria-label={text}
        ref={innerRef}
        type="submit"
        variant={btnVariant ? btnVariant : 'contained'}
        disabled={disabled || isLoading}
        className={`submit-btn ${className}`}
        onClick={handleClick}
        style={style}
        sx={{ ...sx, backgroundColor: colors.primary }}
        name={text}>
        {isLoading ? (
          <div className="loader-center">
            <LoadingState
              color={colors.white}
              width={loadinButtonWidth}
              height="24px"
            />
          </div>
        ) : (
          <Typography
            sx={{
              ...textStyle,
              fontSize: '14px',
              fontFamily: 'Poppins',
              textTransform: 'none',
            }}
            variant={variant}>
            {text}
          </Typography>
        )}
      </Button>
      {!isValidCredentials && <div className="error-text">{errorMessage}</div>}
    </div>
  )
}

export default CustomButton
