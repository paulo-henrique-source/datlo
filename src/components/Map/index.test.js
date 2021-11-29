import React from 'react'
import { render } from '@testing-library/react'
import Map from './index'

describe('Check if map was rendered', function () {
  it('found data-testId attribute in map component', () => {
    const { queryByTestId } = render(<Map />)

    expect(queryByTestId('mapContainer')).toBeTruthy
  })
})
