import React from "react"

const FilterCharacter = props => {
  return (
    <div className="navbar__filter-box">
      <select
        className="navbar__filter-box__filter"
        value={props.filterValue}
        onChange={e => props.setFilterValue(e.target.value)}
      >
        <option value="any">Filter</option>
        <optgroup label="Type">
          {props.types?.map(t => (
            <option key={t} value={t.toLowerCase()}>
              {t}
            </option>
          ))}
        </optgroup>
        <optgroup label="Status">
          {props.status?.map(s => (
            <option key={s} value={s.toLowerCase()}>
              {s}
            </option>
          ))}
        </optgroup>
        <optgroup label="Species">
          {props.species?.map(s => (
            <option key={s} value={s.toLowerCase()}>
              {s}
            </option>
          ))}
        </optgroup>
      </select>
      <button
        className="navbar__btn"
        onClick={() => {
          props.setFilterValue("any")
          props.setCharacterSearch("")
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default FilterCharacter
