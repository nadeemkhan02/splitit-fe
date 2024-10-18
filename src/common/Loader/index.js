import React from 'react'
import Loader from 'react-loader-spinner'
import './loader.css'

function LoadingState({ width, height, color, top, left }) {
  return (
    <div className="item-center" style={{ width, height, top, left }}>
      <Loader
        type="TailSpin"
        color={color}
        height={height}
        width={width}
        // timeout={3000} //3 secs
      />
    </div>
  )
}

export default LoadingState
