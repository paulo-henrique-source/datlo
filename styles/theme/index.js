import { createTheme } from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'

const theme = createTheme(
  {
    palette: {
      background: {
        main: '#E8E8E8',
        light: '#FFFFFF',
      },
      primary: {
        main: '#2F66FF',
      },
      secondary: {
        main: '#762AFF',
      },
      text: {
        main: '#000000',
      },
    },
  },
  ptBR
)

export default theme
