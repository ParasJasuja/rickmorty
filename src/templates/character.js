import { graphql } from "gatsby"
import React from "react"
import FlexContainer from "../components/FlexContainer"
import ImageContainer from "../components/ImageContainer"
import "../scss/styles.scss"

const character = ({ data, pageContext }) => {
  const ch = data.characters
  return (
    <div className="p-character-template">
      <h1 className="heading">{ch.name}</h1>
      <div>
        <ImageContainer
          className="c-image-container"
          image={{
            src: ch.image,
            className: "c-image-container__img",
            loading: "lazy",
          }}
          alt={ch.name}
        />
        <section>
          <FlexContainer>
            <h3 className="l-flex-container__heading">Gender:</h3>
            <p className="l-flex-container__des"> {ch.gender}</p>
          </FlexContainer>
          <FlexContainer>
            <h3 className="l-flex-container__heading">Species:</h3>
            <p className="l-flex-container__des"> {ch.species}</p>
          </FlexContainer>
          <FlexContainer>
            <h3 className="l-flex-container__heading">Status:</h3>
            <p className="l-flex-container__des"> {ch.status}</p>
          </FlexContainer>
          <FlexContainer>
            {ch.type && (
              <>
                <h3 className="l-flex-container__heading">Type:</h3>
                <p className="l-flex-container__des"> {ch.type}</p>
              </>
            )}
          </FlexContainer>
        </section>
      </div>
    </div>
  )
}

export default character

export const pageQuery = graphql`
  query oneCharacter($id: String!) {
    characters(id: { eq: $id }) {
      gender
      id
      image
      name
      species
      status
      type
    }
  }
`
