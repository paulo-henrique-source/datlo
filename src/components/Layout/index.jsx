import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Head from '../Head'
import Navbar from '../Navbar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 128,
      paddingRight: 128,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}))

const Layout = ({ children, title, search }) => {
  const classes = useStyles()
  return (
    <>
      <Head title={title} />
      <div className={classes.root}>
        <Navbar search={search} />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
