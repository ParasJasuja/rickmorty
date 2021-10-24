import { Link } from "gatsby"
import React from "react"

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
    <div>
      <div className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>
        {props.search && (
          <form>
            <input
              type="search"
              placeholder="Search"
              onChange={changeSearchValueHandler}
              value={props.characterSearch}
            />
          </form>
        )}
        <div>
          <Link to="/Characters">Characters</Link>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Layout
