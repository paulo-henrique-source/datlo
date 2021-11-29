import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useSearch } from '../../context/searchValue'

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    position: 'relative',
  },
  input: {
    padding: '10px',
    width: '60px',
    height: '40px',
    background: 'none',
    border: `4px solid ${theme.palette.background.light}`,
    borderRadius: '50px',
    boxSizing: 'border-box',
    fontSize: '26px',
    outline: 'none',
    transition: '0.5s',
    color: 'transparent',
    '&:focus': {
      width: '350px',
      background: 'transparent',
      borderRadius: '5px',
      color: `${theme.palette.background.light}`,
    },
  },
  icon: {
    position: 'absolute',
    top: '60%',
    right: '-5px',
    transform: 'translate(-50%, -50%)',
    fontSize: '26px',
    color: theme.palette.background.light,
    transition: '0.2s',
    cursor: 'text',
    '&:hover': {
      cursor: 'text',
    },
  },
}))

const SearchInput = () => {
  const classes = useStyles()
  const { searchValue, setSearchValue } = useSearch()

  return (
    <>
      <div className={classes.inputContainer}>
        <input
          type="text"
          className={classes.input}
          name="txt"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          autoComplete="off"
        />
        <i className={classes.icon}>
          <SearchIcon />
        </i>
      </div>
    </>
  )
}

export default SearchInput
