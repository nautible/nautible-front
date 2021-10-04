// public Compornents
import React from 'react';

// Material-UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// 商品詳細画面で商品をカートに入れた時に表示するダイアログ
const ProductDetailPage: React.FC<{openFlag: boolean, forward: () => void, back: () => void }> = ({openFlag, forward, back}) => {

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={openFlag}>
    <DialogTitle id="customized-dialog-title">
      カート投入完了
    </DialogTitle>
    <DialogContent dividers>
      <DialogActions>
        <Button autoFocus onClick={forward} color="primary">
          カート画面に進む
        </Button>
      </DialogActions>
      <DialogActions>
        <Button autoFocus onClick={back} color="primary">
          商品一覧に戻る
        </Button>
      </DialogActions>
    </DialogContent>
    </Dialog>
  )
}
export default ProductDetailPage