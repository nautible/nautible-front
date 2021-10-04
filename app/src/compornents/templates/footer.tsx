// public Compornents
import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      textAlign: 'center',
      position: 'absolute',
      backgroundColor: "#3f51b5",
      color: "#ffffff",
      bottom: '0'
    }
  })
)

// フッタ
const Footer: React.FC = () => {

  const classes = useStyles()

  return (
    <Box className={classes.root}>
      copyright xxxx
    </Box>
  )
}

export default Footer