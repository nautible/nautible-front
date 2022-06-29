import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import {Delivery} from '../../types/order'

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


// 注文画面で表示する 届け先情報コンポーネント
const OrderDelivery: React.FC<{delivery: Delivery}> = (delivery) => {

  const classes = useStyles()

  // API（お届け先情報取得）がができたら入れ替え
  //const {id} = useParams<ParamTypes>()
  //const [data, setDelivery] = useState({ product: '' });
  const [data, setDelivery] = useState(delivery);

  const fetchDelivery = async () => {
    //顧客情報取得
    // TODO 暫定でId「1」固定で取得
    axios.get(
      '/customer/1',
    ).then(result => {
      const delivery: Delivery = {
        ...result.data.customer,
        postCode: result.data.customer.address.zipCode,
        address1: result.data.customer.address.address1,
        address2: result.data.customer.address.address2
      }
      // setDelivery({delivery: {delivery: {...deliveryT}}})
      setDelivery({delivery: {...delivery}})
    }).catch(err => {
      console.log(err)
      return
    })
  };

  useEffect(() => {
    fetchDelivery();
  }, [setDelivery]);
  
  const addDelivery = () => {
    alert("この機能はまだありません")
  }

  return (
    <div className={classes.root}>
      <Box m={2} p={1}>
        <Typography className={classes.header}>お届け先情報</Typography>
      </Box>
      <Box m={2} p={1}>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="お名前" value={data.delivery.name}/>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="郵便番号" value={data.delivery.postCode}/>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="お届け先" value={data.delivery.address1 + " " + data.delivery.address2}/>
        <TextField className={classes.body} InputProps={{readOnly: true}} label="お電話番号" value={data.delivery.tel}/>
      </Box>
      <Button variant="contained" color="primary" onClick={addDelivery}>
        お届け先を変更する
      </Button>
    </div>
  )
}

export default OrderDelivery