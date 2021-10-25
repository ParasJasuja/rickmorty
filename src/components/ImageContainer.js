import React from "react"

const ImageContainer = props => {
  return (
    <div className={props.className}>
      <img {...props.image} alt={props.alt} />
    </div>
  )
}

export default ImageContainer
