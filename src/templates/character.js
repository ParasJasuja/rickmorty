import { graphql } from "gatsby"
import React from "react"
import ImageContainer from "../components/ImageContainer"
import "../scss/main.scss"

const character = ({ data, pageContext }) => {
  const ch = data.characters
  return (
    <div className="character">
      <h1 className="character__heading">{ch.name}</h1>
      <div>
        <ImageContainer
          className="character__image-container"
          image={{
            src: ch.image,
            className: "character__image-container__img",
            loading: "lazy",
          }}
          alt={ch.name}
        />
        <section className="character__description">
          <div className="character__description__flex-container">
            <h3>Gender:</h3>
            <p> {ch.gender}</p>
          </div>
          <div className="character__description__flex-container">
            <h3>Species:</h3>
            <p> {ch.species}</p>
          </div>
          <div className="character__description__flex-container">
            <h3>Status:</h3>
            <p> {ch.status}</p>
          </div>
          <div className="character__description__flex-container">
            {ch.type && (
              <>
                <h3>Type:</h3>
                <p> {ch.type}</p>
              </>
            )}
          </div>
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
