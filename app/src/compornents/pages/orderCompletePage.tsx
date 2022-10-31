import * as React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "60px",
    },
  })
)

// 注文完了画面
const OrderCompletePage: React.FC = () => {

  const classes = useStyles()

  const navigate = useNavigate()
  const linkTop = () => {
    navigate("/")
  }
  return (
    <Box className={classes.root} m={2} p={1}>
      <Typography>ご購入ありがとうございました。</Typography>
      <Typography>注文番号：1234567890</Typography>
      <Button variant="contained" color="primary" onClick={linkTop}>
        商品一覧に戻る
      </Button>
    </Box>
  )
}

export default OrderCompletePage