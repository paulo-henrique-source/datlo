import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { alpha, makeStyles } from '@material-ui/core/styles'
import SearchInput from '../SearchInput'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  appBar: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.059)',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: theme.palette.background.light,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    fontSize: '2.125rem',
    fontFamily: 'Roboto Helvetica Arial sans-serif',
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
    color: 'white',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NavBar = ({ search }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="transparent">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <div className="link">
              <Link href="/" style={{ color: 'white' }}>
                Leaflet
              </Link>
            </div>
          </Typography>
          {search && <SearchInput />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
