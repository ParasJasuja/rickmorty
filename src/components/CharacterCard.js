import { Link } from "gatsby"
import React from "react"
import ImageContainer from "./ImageContainer"

const CharacterCard = props => {
  const character = props.character
  return (
    <div className="card">
      <Link
        className="card__link"
        to={"/character/" + character.name + character.id}
        key={character.id}
      >
        <div>
          <ImageContainer
            className="card__image-container"
            image={{
              src: character.image,
              className: "card__image-container__img",
              loading: "lazy",
            }}
            alt={character.name}
          />
          <h2 className="c-character-card__h2">{character.name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default CharacterCard
