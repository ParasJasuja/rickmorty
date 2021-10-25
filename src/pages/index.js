import * as React from "react"
import { graphql } from "gatsby"
import GridContainer from "../components/GridContainer"
import CharacterCard from "../components/CharacterCard"
import Layout from "../components/Layout"
import "../scss/main.scss"

const IndexPage = ({ data }) => {
  const [characterSearch, setCharacterSearch] = React.useState("")
  const [filterValue, setFilterValue] = React.useState("any")
  const [noOfCharacters, setNoOfCharacters] = React.useState(20)
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  const [charactersList, setCharactersList] = React.useState(characters)
  const types = []
  const status = []
  const species = []
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
  characters.forEach(ch => {
    if (!types.includes(ch.type) && ch.type !== "") {
      types.push(ch.type)
    }
  })
  characters.forEach(ch => {
    if (!status.includes(ch.status) && ch.status !== "") {
      status.push(ch.status)
    }
  })
  characters.forEach(ch => {
    if (!species.includes(ch.species) && ch.species !== "") {
      species.push(ch.species)
    }
  })

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterCharacter = () => {
      const newCharactersList = characters.filter(ch => {
        return (
          ch.type.toLowerCase() === filterValue ||
          ch.status.toLowerCase() === filterValue ||
          ch.species.toLowerCase() === filterValue
        )
      })
      return newCharactersList
    }
    const searchCharacter = chList => {
      const newCharactersList = chList.filter(ch => {
        const name = ch.name.toLowerCase()
        return name.indexOf(characterSearch.toLowerCase()) > -1
      })
      return newCharactersList
    }
    if (characterSearch === "" && filterValue === "any") {
      setCharactersList(characters)
    } else if (characterSearch !== "" && filterValue === "any") {
      const newCharactersList = searchCharacter(characters)
      setCharactersList(newCharactersList)
    } else if (characterSearch === "" && filterValue !== "any") {
      const newCharactersList = filterCharacter()
      setCharactersList(newCharactersList)
    } else if (characterSearch !== "" && filterValue !== "any") {
      const newFilterCharacters = filterCharacter()
      const newCharactersList = searchCharacter(newFilterCharacters)
      setCharactersList(newCharactersList)
    } else {
      setCharactersList(prvs => prvs)
    }
  }, [noOfCharacters, characterSearch, filterValue])

  React.useEffect(() => {
    setNoOfCharacters(20)
  }, [characterSearch, filterValue])
  return (
    <Layout
      characters={characters}
      characterSearch={characterSearch}
      types={types}
      status={status}
      species={species}
      filterValue={filterValue}
      setCharactersList={setCharactersList}
      setFilterValue={setFilterValue}
      setCharacterSearch={setCharacterSearch}
      search
    >
      <GridContainer>
        {charactersList.length > 0 ? (
          charactersList.slice(noOfCharacters - 20, noOfCharacters).map(ch => {
            return <CharacterCard key={ch.id} character={ch} />
          })
        ) : (
          <h2 className="grid-container__heading">No Match Found</h2>
        )}
      </GridContainer>
      <div className="links">
        {noOfCharacters / 20 === 1 ? (
          <button className="links__btn links__btn--disabled">prvs</button>
        ) : (
          <button className="links__btn links__btn--hover" onClick={prvsPage}>
            prvs
          </button>
        )}

        {Math.ceil(charactersList.length / 20) !== 0 && (
          <p className="links__pages">
            {noOfCharacters / 20}/{Math.ceil(charactersList.length / 20)}
          </p>
        )}
        {noOfCharacters / 20 >= Math.ceil(charactersList.length / 20) ? (
          <button className="links__btn links__btn--disabled">next</button>
        ) : (
          <button className="links__btn links__btn--hover" onClick={nextPage}>
            next
          </button>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query fewCharacters {
    allCharacters {
      nodes {
        id
        name
        image
        type
        status
        species
      }
    }
  }
`
