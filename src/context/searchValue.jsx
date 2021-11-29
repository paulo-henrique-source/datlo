import React, { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

export default function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useCount must be used within a SearchContext')
  const { searchValue, setSearchValue } = context
  return { searchValue, setSearchValue }
}
