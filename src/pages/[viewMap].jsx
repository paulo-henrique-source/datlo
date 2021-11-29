import React, { useEffect, useState, useCallback } from 'react'
import { Card, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import api from '../services/api/api'
import Layout from '../components/Layout'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  grid: {
    position: 'fixed',
    top: '50%',
    left: '0%',
  },
  mapView: {
    width: '100%',
    height: 800,
    backgroundColor: theme.palette.background.main,
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  mapHeader: {
    padding: '15px',
    fontSize: '20px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    borderRadius: '10px 10px 0 0',
  },
  map: {
    height: 800,
    width: '100%',
  },
}))

const ViewMap = () => {
  const classes = useStyles()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [geoJSON, setGeoJSON] = useState([])

  const { enqueueSnackbar } = useSnackbar()
  const defaultPosition = [-23.414737383595362, -51.936836242675774]

  const handleGetGeoJSON = useCallback(
    async (routerCode) => {
      try {
        setIsLoading(true)
        if (routerCode) {
          const response = await api.get('Map/City', {
            //IBGECODE ESTÁTICO DEVIDO A FALATA DE GEOJSON NA API
            params: { ibgeCode: '4115200' },

            // params: { ibgeCode: routerCode },
          })
          if (response) {
            setGeoJSON(response.data)
          }
        }
      } catch (error) {
        console.error(error)
        enqueueSnackbar('Houve um erro ao carregar o mapa, tente novamente.', {
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
    [enqueueSnackbar]
  )

  useEffect(() => {
    handleGetGeoJSON(router.query.ibcode)
    setTitle(router.query.city)
  }, [handleGetGeoJSON, router.query])
  return (
    <Layout title={title} search={false}>
      {isLoading ? (
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
      ) : (
        <Card>
          <div className={classes.mapView}>
            <div className={classes.mapContainer}>
              <div className={classes.mapHeader}>{title}</div>
              <div className={classes.map}>
                <Map
                  defaultPosition={defaultPosition}
                  location={defaultPosition}
                  geoJSONData={geoJSON}
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </Layout>
  )
}

export default ViewMap
