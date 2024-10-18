/** @format */

import React, { useState } from 'react'
import { withStyles } from '@mui/styles'
import {
  InputAdornment,
  IconButton,
  TextField,
  InputLabel,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import EyeOff from '../../assets/icons/eye-off.svg'
import EyeOn from '../../assets/icons/eye.svg'
import './index.css'

const multiLineStyles = {
  root: {
    '& .MuiOutlinedInput-root': {
      height: '110px',
    },
  },
}

export const InputField = function ({
  label,
  value = '',
  color,
  name,
  onChange,
  onBlur,
  variant,
  isValid,
  message,
  type,
  placeholder,
  classes,
  fullWidth = true,
  style,
  inputAdornmentComp,
  isRequired = false,
  isLabel = true,
  disabled = false,
  className,
  allowFloat = false,
  isEditEmailField = false,
  inputProps,
  maxNumberLength,
  multiline = false,
  rows,
  autofocus = false,
  sx,
  onKeyPress,
  InputProps,
  ref,
}) {
  return (
    <>
      {isLabel && (
        <InputLabel
          htmlFor={name}
          required={isRequired}
          className="inputfield-label">
          {label}
        </InputLabel>
      )}
      <TextField
        id={name}
        type={type}
        className={className}
        onWheel={(e) => e.target.blur()}
        classes={classes}
        error={!isValid}
        ref={ref}
        style={style}
        sx={sx}
        variant={variant ? variant : 'outlined'}
        autoComplete="off"
        autoFocus={autofocus}
        color={color}
        disabled={disabled}
        onKeyPress={onKeyPress}
        onKeyDown={(evt) => {
          type === 'number' &&
            (evt.key === 'e' || evt.key === '-') &&
            evt.preventDefault()
          evt.stopPropagation()
          !allowFloat &&
            type === 'number' &&
            evt.key === '.' &&
            evt.preventDefault()
          evt.stopPropagation()
        }}
        InputProps={{
          ...InputProps,
          endAdornment: inputAdornmentComp && (
            <InputAdornment position="end">{inputAdornmentComp}</InputAdornment>
          ),
        }}
        inputProps={inputProps}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value ? value : ''}
        fullWidth={fullWidth}
        name={name}
        onInput={(e) => {
          type === 'number' &&
            maxNumberLength &&
            (e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, maxNumberLength))
        }}
        helperText={
          !isValid ? (
            <Typography data-testid={name} variant="hl_inputSm">
              {message}
            </Typography>
          ) : null
        }
        multiline={multiline}
        rows={rows}
      />
    </>
  )
}

export const InputPasswordField = function ({
  label,
  value,
  color,
  name,
  onChange,
  onBlur,
  isValid,
  variant,
  message,
  placeholder,
  classes,
  isRequired,
  style,
  inputProps,
  sx,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handleClickShowPassword = () => {
    setIsPasswordVisible(isPasswordVisible ? false : true)
  }
  return (
    <div>
      <InputLabel
        data-testid={`${name}Label`}
        htmlFor={name}
        required={isRequired}
        className="inputfield-label">
        {label}
      </InputLabel>
      <TextField
        data-testid={`${name}Field`}
        id={name}
        type={isPasswordVisible ? 'text' : 'password'}
        variant={variant ? variant : 'outlined'}
        color={color}
        style={style}
        onChange={onChange}
        error={!isValid}
        classes={classes}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        fullWidth
        sx={sx}
        name={name}
        helperText={
          <Typography data-testid={`${name}Message`} variant="hl_inputSm">
            {!isValid ? message : null}
          </Typography>
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}>
                {isPasswordVisible ? (
                  <img src={EyeOn} alt="eye open" />
                ) : (
                  <img src={EyeOff} alt="eye open" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={inputProps}
      />
    </div>
  )
}

export const InputBox = function ({
  label,
  value = '',
  name,
  onChange,
  onBlur,
  isValid,
  message,
  type,
  placeholder,
  isRequired = false,
  isLabel = true,
  disabled = false,
  rows,
  minRows,
  minHeight,
}) {
  return (
    <>
      {isLabel && (
        <InputLabel required={isRequired} className="inputfield-label">
          {label}
        </InputLabel>
      )}
      <div className="text-area-field-container">
        <TextareaAutosize
          type={type}
          onWheel={(e) => e.target.blur()}
          style={{
            minHeight: minHeight,
          }}
          variant="outlined"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value ? value : ''}
          name={name}
          maxRows={rows}
          minRows={minRows}
          maxLength="1000"
        />
        <div className="textAreaCharLimit">
          {1000 - value?.length} characters remaining
        </div>
        <div>
          <small
            style={{
              marginTop: isValid && '2px',
              display: isValid ? 'none' : 'block',
            }}
            className="inputfield-message">
            {message}
          </small>
        </div>
      </div>
    </>
  )
}

export const MultiLineInputField = withStyles(multiLineStyles)(function ({
  label,
  value = '',
  color,
  name,
  onChange,
  onBlur,
  variant,
  isValid,
  message,
  htmlFor,
  type,
  placeholder,
  classes,
  fullWidth = true,
  style,
  inputAdornmentComp,
  isRequired = false,
  isLabel = true,
  disabled = false,
  className,
  allowFloat = false,
  isEditEmailField = false,
  inputProps,
  maxNumberLength,
  rows,
  inputHeight,
}) {
  return (
    <>
      {isLabel && (
        <InputLabel
          htmlFor={name}
          required={isRequired}
          className="inputfield-label">
          {label}
        </InputLabel>
      )}
      <TextField
        id={name}
        type={type}
        className={`
        ${
          disabled
            ? 'inputfield-edit-css'
            : isEditEmailField
            ? 'inputfield-email-edit-css'
            : 'inputfield-css'
        }${className}`}
        onWheel={(e) => e.target.blur()}
        classes={classes}
        error={!isValid}
        style={style}
        variant={variant ? variant : 'outlined'}
        autoComplete="off"
        color={color}
        disabled={disabled}
        onKeyDown={(evt) => {
          type === 'number' &&
            (evt.key === 'e' || evt.key === '-') &&
            evt.preventDefault()
          !allowFloat &&
            type === 'number' &&
            evt.key === '.' &&
            evt.preventDefault()
        }}
        InputProps={{
          endAdornment: inputAdornmentComp && (
            <InputAdornment position="end">{inputAdornmentComp}</InputAdornment>
          ),
        }}
        inputProps={inputProps}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value ? value : ''}
        fullWidth={fullWidth}
        name={name}
        views={['year', 'month']}
        onInput={(e) => {
          type === 'number' &&
            maxNumberLength &&
            (e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, maxNumberLength))
        }}
        helperText={
          !isValid ? (
            <Typography data-testid={name} variant="hl_inputSm">
              {message}
            </Typography>
          ) : null
        }
        multiline
        rows={rows}
      />
    </>
  )
})
