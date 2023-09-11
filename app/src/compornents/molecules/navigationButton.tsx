import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    naviButton: {
      display: "flex",
      maxWidth: "100%",
      justifyContent: "center",
      alignItems: "center",
      margin: "60px",
    }
  })
)

// 進むと戻るの2択ナビゲーションボタン
const NavigationButton: React.FC<{forwardName: string, forward: () => void, backName: string, back: () => void}> = ({forwardName, forward, backName, back}) => {

  const classes = useStyles()

  return (
    <Box className={classes.naviButton}>
      <Box m={2}>
        <Button variant="contained" color="info" onClick={back}>
        {backName}
        </Button>
      </Box>
      <Box m={2}>
        <Button variant="contained" color="info" onClick={forward}>
        {forwardName}
        </Button>
      </Box>
    </Box>
  )
}

export default NavigationButton