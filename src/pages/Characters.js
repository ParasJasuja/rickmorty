import * as React from "react"
import { graphql } from "gatsby"
import CharacterCard from "../components/CharacterCard"
import GridContainer from "../components/GridContainer"
import Layout from "../components/Layout"
import "../scss/styles.scss"

const IndexPage = ({ data }) => {
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  const [characterSearch, setCharacterSearch] = React.useState("")
  const [charactersList, setCharactersList] = React.useState(characters)
  const [noOfCharacters, setNoOfCharacters] = React.useState(20)
  const nextPage = () => {
    if (charactersList.length - 1 > noOfCharacters) {
      setNoOfCharacters(prvs => prvs + 20)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }
  const prvsPage = () => {
    if (noOfCharacters - 20 > 0) {
      setNoOfCharacters(prvs => prvs - 20)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const newCharactersList = characters.filter(ch => {
      const name = ch.name.toLowerCase()
      return name.indexOf(characterSearch.toLowerCase()) > -1
    })
    setCharactersList(newCharactersList)
  }, [characterSearch, noOfCharacters])

  return (
    <Layout
      characters={characters}
      setCharactersList={setCharactersList}
      characterSearch={characterSearch}
      setCharacterSearch={setCharacterSearch}
      setNoOfCharacters={setNoOfCharacters}
      search
    >
      <h2 className="heading">Character List</h2>
      <GridContainer>
        {charactersList.length > 0 ? (
          charactersList.slice(noOfCharacters - 20, noOfCharacters).map(ch => {
            return <CharacterCard key={ch.id} character={ch} />
          })
        ) : (
          <h2 className="heading">No Match Found</h2>
        )}
      </GridContainer>
      <div className="links">
        {noOfCharacters / 20 === 1 ? (
          <button className="link-btn disabled">prvs</button>
        ) : (
          <button className="link-btn link-btn-hover" onClick={prvsPage}>
            prvs
          </button>
        )}

        <p>
          {noOfCharacters / 20}/{Math.ceil(charactersList.length / 20)}
        </p>
        {noOfCharacters / 20 === charactersList.length / 20 ? (
          <button className="link-btn disabled">next</button>
        ) : (
          <button className="link-btn link-btn-hover" onClick={nextPage}>
            next
          </button>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query allCharacters {
    allCharacters {
      nodes {
        gender
        id
        image
        name
        species
        status
        type
      }
    }
  }
`
