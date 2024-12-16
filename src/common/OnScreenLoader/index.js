import React from 'react'
import Loader from '../Loader'
import './onScreenLoader.css'
import colors from '../../constants/colors'

function OnScreenLoader(props) {
  const { IsLoading, isLoaderVisible = true } = props
  if (!IsLoading) {
    return null // Explicitly return null when IsLoading is false
  }

  return (
    <div id="fixed" className="onscreen-loader-container">
      <div className="onscreen-loader">
        {isLoaderVisible && (
          <Loader color={colors.primary} width={'80px'} height={'80px'} />
        )}
      </div>
    </div>
  )
}

export default OnScreenLoader
