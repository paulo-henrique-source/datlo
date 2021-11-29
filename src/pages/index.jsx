import React from 'react'
import Layout from '../components/Layout'
import ListCities from '../components/ListCities'
import { SnackbarProvider } from 'notistack'
import { useSearch } from '../context/searchValue'

const City = () => {
  const { searchValue } = useSearch()
  return (
    <Layout title="Cities" search={true}>
      <SnackbarProvider>
        <ListCities name="Cidades" searchValue={searchValue} />
      </SnackbarProvider>
    </Layout>
  )
}

export default City
