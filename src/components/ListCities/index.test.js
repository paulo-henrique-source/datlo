import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import ListCities from './index'

describe('show on map button', () => {
  describe('if rowSelectedItem was empty', () => {
    it('does not send to page', async () => {
      const rowSelectedId = jest.fn()
      const { getByTestId } = render(
        <SnackbarProvider>
          <ListCities rowSelectedId={rowSelectedId} />
        </SnackbarProvider>
      )
      const btnNode = await waitFor(() => getByTestId('button-btn'))

      fireEvent.click(btnNode)

      expect(rowSelectedId).not.toHaveBeenCalled()
    })
  })

  describe('if send to map button exists', () => {
    it('found data-testId attribute in button component', async () => {
      const { getByTestId } = render(
        <SnackbarProvider>
          <ListCities />
        </SnackbarProvider>
      )
      const btnNode = await waitFor(() => getByTestId('button-btn'))

      fireEvent.click(btnNode)
    })
  })
})
