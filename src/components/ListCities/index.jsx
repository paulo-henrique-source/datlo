import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  Radio,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'
import Map from '@material-ui/icons/Map'
import LocaleText from '../../utils/LocaleTextUtils/index.json'
import api from '../../services/api/api'

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    backgroundColor: theme?.palette?.background.light,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
  },
  boxHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '16px',
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: '18px',
  },
  grid: {
    position: 'fixed',
    top: '50%',
    left: '0%',
  },
}))

const ListCities = ({ name, searchValue }) => {
  const classes = useStyles()
  const [cities, setCities] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [rowSelectedId, setRowSelectedId] = useState('')
  const [rowSelectedItem, setRowSelectedItem] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const handleGetCities = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get('Cities', {
        params: { pageNumber: page },
      })
      if (response) {
        setCities(response.data)
        setPage(response.data.pageIndex)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      console.error(error)
      enqueueSnackbar(
        'Houve um erro ao carregar as cidades, tente novamente.',
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        }
      )
    } finally {
      setIsLoading(false)
    }
  }, [enqueueSnackbar, page])

  const handleSearchCities = useCallback(
    async (searchValue) => {
      try {
        setIsLoading(true)
        if (searchValue.length === 0) {
          const response = await api.get('Cities', {
            params: { pageNumber: page },
          })
          if (response) {
            setCities(response.data)
            setPage(response.data.pageIndex)
            setTotalPages(response.data.totalPages)
          }
        } else if (searchValue.length >= 1) {
          const response = await api.get('Cities', {
            params: {
              searchString: searchValue,
            },
          })
          if (response) {
            setCities(response.data)
            setPage(response.data.pageIndex)
            setTotalPages(response.data.totalPages)
          }
        }
      } catch {
        enqueueSnackbar('Houve um erro na busca, tente novamente.', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
      } finally {
        setIsLoading(false)
      }
    },
    [enqueueSnackbar, searchValue]
  )

  useEffect(() => {
    handleGetCities()
  }, [page])

  useEffect(() => {
    handleSearchCities(searchValue)
  }, [handleSearchCities])

  return (
    <>
      {isLoading ? (
        <>
          <Card>
            <div className={classes.boxHeader}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.headerTitle}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="outlined"
                    disableElevation
                    style={{ fontWeight: 700, marginRight: '15px' }}
                    startIcon={<Map />}
                  >
                    Ver no mapa
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Divider />
            <CardContent>
              <div style={{ height: 700, width: '100%' }}>
                <Grid
                  className={classes.grid}
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <CircularProgress color="primary" />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <Box className={classes.boxHeader}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.headerTitle}>{name}</Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  disableElevation
                  style={{ fontWeight: 700, marginRight: '15px' }}
                  startIcon={<Map />}
                  data-testid="button-btn"
                  onClick={() => {
                    if (rowSelectedId === '') {
                      return enqueueSnackbar(
                        'Selecione uma coluna da tabela.',
                        {
                          variant: 'info',
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                          },
                        }
                      )
                    }
                    return router.push(
                      `/viewMap?city=${rowSelectedItem.name}&ibcode=${rowSelectedItem.ibgeCode}`
                    )
                  }}
                >
                  Ver no mapa
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <CardContent>
            <div style={{ height: 700, width: '100%' }}>
              <DataGrid
                className={classes.dataGrid}
                rows={cities.items ? cities.items : cities}
                paginationMode="server"
                rowCount={totalPages}
                rowsPerPageOptions={[10]}
                onPageChange={(params) => {
                  setPage(params + 1)
                }}
                pageSize={10}
                page={page - 1}
                disableColumnMenu={true}
                hideFooterSelectedRowCount={true}
                onSelectionModelChange={(newSelection) => {
                  setRowSelectedId(newSelection[0])
                }}
                localeText={LocaleText}
                columns={[
                  {
                    field: 'radio',
                    headerName: ' ',
                    width: 40,
                    renderCell: (cellValues) => {
                      return (
                        <Radio
                          onChange={() => {
                            setRowSelectedItem(cellValues.row)
                          }}
                          checked={cellValues.id === rowSelectedId}
                          id={cellValues.id}
                          value={cellValues.row}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': { cellValues } }}
                        />
                      )
                    },
                  },
                  {
                    field: 'ibgeCode',
                    headerName: 'Código IBGE',
                    align: 'center',
                    headerAlign: 'center',
                    width: 148,
                    editable: false,
                  },
                  {
                    field: 'name',
                    headerName: 'Cidade',
                    sortable: false,
                    align: 'center',
                    headerAlign: 'center',
                    width: 400,
                  },
                  {
                    field: 'stateInitials',
                    headerName: 'UF',
                    sortable: false,
                    align: 'center',
                    headerAlign: 'center',
                    width: 400,
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default ListCities
