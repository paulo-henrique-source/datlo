import React from 'react'
import Layout from '../components/Layout'
import ListCities from '../components/ListCities'
import { useSearch } from '../context/searchValue'

const City = () => {
  const { searchValue } = useSearch()
  return (
    <Layout title="Cities" search={true}>
      <ListCities name="Cidades" searchValue={searchValue} />
    </Layout>
  )
}

export default City
