import React, { memo, useEffect, useState } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import { makeStyles } from '@material-ui/styles'
import GetColorUtils from '../../utils/ColorUtils/colorUtils'
import CustomTileLayer from './Layers/CustomTileLayer'
import theme from '../../../styles/theme'

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: '100%',
    [theme?.breakpoints?.up('xl')]: {
      height: '100vh',
    },
    [theme?.breakpoints?.down('xl')]: {
      height: '80vh',
    },
    [theme?.breakpoints?.down('lg')]: {
      height: '66vh',
    },
  },
}))

const Map = ({ location, defaultPosition, geoJSONData }) => {
  const classes = useStyles()
  const [map, setMap] = useState(null)

  const handleSetView = () => {
    if (map && location) {
      map.flyTo(location, 13, {
        duration: 4,
      })
    }
  }

  const handleLayerOptions = (feature, layer) => {
    const properties = feature.properties

    layer.setStyle({
      color: theme.palette.text.main,
      fillColor: GetColorUtils(parseInt(properties.population)),
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
    })

    layer.bindPopup(
      `Total de população: ${properties.population} Renda média: ${properties.averageincome} R$ `,
      {
        maxWidth: 160,
      }
    )
  }

  useEffect(() => handleSetView, [location])

  return (
    <>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={classes.mapContainer}
        whenCreated={(map) => setMap(map)}
        data-testid="mapContainer"
      >
        <CustomTileLayer />
        {geoJSONData && (
          <GeoJSON
            data={geoJSONData.features}
            onEachFeature={(feature, layer) =>
              handleLayerOptions(feature, layer)
            }
          />
        )}
      </MapContainer>
    </>
  )
}

export default memo(Map)
