import React, { useState, useEffect } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {Payment} from '../../types/order'

const dummyPayment: Payment = {
  id: "1",
  paymentType: "クレジット",
  cardCompany: "VISA",
  cardNumberMask: "XXXX-XXXX-XXXX-1234",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0px",
    },
    header: {
      width: "100%",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      width: "100%",
    },
  })
)

// 注文画面で表示する支払い情報コンポーネント
const OrderPayment: React.FC = () => {

  const classes = useStyles()

  // API（支払い情報取得取得）がができたら入れ替え
  //const {id} = useParams<ParamTypes>()
  //const [data, setPayment] = useState({ payment: '' });
  const [data, setPayment] = useState({payment: dummyPayment});

  const fetchPayment = async () => {
    // API（お届け先情報取得）が出来たら呼び出す
    // const result = await axios(
    //  'https://localhost',
    // );
    ///setDelivery(result.data);
    setPayment(data);
  };
  useEffect(() => {
    fetchPayment();
  }, [setPayment]);

  const modifyPayment = () => {
    alert("この機能はまだありません")
  }
  return (
    <div className={classes.root}>
      <Box m={2} p={1}>
        <Typography className={classes.header}>お支払い情報</Typography>
      </Box>
      <Box m={2} p={1}>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="お支払タイプ" defaultValue={data.payment.paymentType}/>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="カード会社" defaultValue={data.payment.cardCompany}/>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="カード番号" defaultValue={data.payment.cardNumberMask}/>
      </Box>
      <Button variant="contained" color="primary" onClick={modifyPayment}>
        お支払方法を変更する
      </Button>
    </div>
  )
}

export default OrderPayment