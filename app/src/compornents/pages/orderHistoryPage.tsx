import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import OrderHistory from '../organisms/orderHistory'
import {Order, OrderProduct, Delivery, Payment} from '../../types/order'

// ダミーデータ
const dummyProduct1: OrderProduct[] = [
  {
    "id": "1",
    "name": "Kubernetes完全ガイド",
    "url": "http://localhost",
    "image": "/item.png",
    "price": 1000
  }
]

const dummyDelivery:Delivery = {
    "id": "1",
    "name": "大阪太郎",
    "postCode": "111-1111",
    "address1": "大阪府豊中市",
    "address2": "W101",
    "tel": "11-1111-1111",
    "default": true
  }

  const dummyPayment: Payment = {
    id: "1",
    paymentType: "クレジット",
    cardCompany: "VISA",
    cardNumberMask: "XXXX-XXXX-XXXX-1234",
  }
  
const dummyOrderHistories: Order[] = [
  {
    "products": dummyProduct1,
    "orderNo": "1",
    "orderDate": "2020年10月25日",
    "orderStatus": "注文完了",
    "orderPrice": 6000,
    "delivery": dummyDelivery,
    "payment": dummyPayment
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      paddingTop: '8px',
      paddingBottom: '8px',
    }
  })
)

type Result = {
  data: Data;
}
type Data = {
  orderHistories: Order[];
}

// 商品一覧画面
const OrderHistoryPage: React.FC = () => {

  const classes = useStyles()

  const [data, setOrderHistory] = useState({ orderHistories: dummyOrderHistories });

  const fetchOrderHistory = async () => {
    // TODO 暫定対応。顧客Idは1固定で取得
    axios.get(
      '/order/findByCustomerId/1',
    ).then(result => {
      setOrderHistory({orderHistories: result.data.orders});
    }).catch(err =>{
      console.log(err)
    })
  };
  
  useEffect(() => {
    fetchOrderHistory();
  }, [setOrderHistory]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {data.orderHistories.map((order: Order) => (
        <Box border={1}>
          <OrderHistory order={order} />
        </Box>
      ))}
    </Container>
  );
}

export default OrderHistoryPage