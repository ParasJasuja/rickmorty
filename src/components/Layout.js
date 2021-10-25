import React from "react"
import FilterCharacter from "./FilterCharacter"

const Layout = props => {
  const changeSearchValueHandler = e => {
    const newValue = e.target.value
    if (props.setNoOfCharacters) {
      props.setCharacterSearch(prvs => {
        if (newValue.length !== prvs.length) {
          props.setNoOfCharacters(20)
          return newValue
        }
      })
    }
    props.setCharacterSearch(newValue)
  }
  return (
    <div className="l-layout">
      <div className="navbar">
        {props.search && (
          <form
            className="navbar__form"
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <input
              className="navbar__search"
              type="search"
              placeholder="Search"
              onChange={changeSearchValueHandler}
              value={props.characterSearch}
            />
          </form>
        )}
        <FilterCharacter {...props} />
      </div>
      {props.children}
    </div>
  )
}

export default Layout
