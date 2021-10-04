// public Compornents
import React from 'react';

// Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignContent: 'center',
    },
  })
)

// 商品詳細画面で商品をカートに入れた時に表示するダイアログ
const ProductDetailPage: React.FC<{openFlag: boolean, order: () => void, cancel: () => void }> = ({openFlag, order, cancel}) => {

  const classes = useStyles()

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openFlag}>
    <DialogTitle id="customized-dialog-title">
      購入確認
    </DialogTitle>
    <DialogContent className={classes.root} dividers>
      この情報で購入します。よろしいですか？
      <Box m={3} p={1}>
        <DialogActions>
          <Button autoFocus onClick={order} color="primary">
            はい。購入します。
          </Button>
        </DialogActions>
        <DialogActions>
          <Button autoFocus onClick={cancel} color="primary">
          いいえ。もう少し考えます。
          </Button>
        </DialogActions>
      </Box>
    </DialogContent>
    </Dialog>
  )
}
export default ProductDetailPage