import React, { memo, useEffect, useState } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import GetColorUtils from '../../utils/ColorUtils/colorUtils'
import CustomTileLayer from './Layers/CustomTileLayer'
import theme from '../../../styles/theme'

const Map = ({ location, defaultPosition, geoJSON }) => {
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
        style={{ width: '100%', height: 744 }}
        whenCreated={(map) => setMap(map)}
      >
        <CustomTileLayer />
        <GeoJSON
          data={geoJSON.features}
          onEachFeature={(feature, layer) => handleLayerOptions(feature, layer)}
        />
      </MapContainer>
    </>
  )
}

export default memo(Map)
