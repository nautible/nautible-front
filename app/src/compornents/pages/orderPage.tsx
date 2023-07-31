import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import NavigationButton from '../molecules/navigationButton'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import OrderDelivery from '../organisms/orderDelivery'
import OrderPayment from '../organisms/orderPayment'
import OrderItem from '../organisms/orderItem'
import OrderDialog from '../templates/orderDialog'

import {Cart, CartProduct} from '../../types/cart'
import {Order, OrderProduct, Delivery, Payment} from '../../types/order'

const dummyProducts: CartProduct[] = [
  {
    "id": "1",
    "image": "/item.png",
    "name": "kubernetes完全ガイド",
    "price": 1000,
    "allPrice": 2000,
    "count": 2
  },
  {
    "id": "2",
    "image": "/item.png",
    "name": "kubernetes実践ガイド",
    "price": 1000,
    "allPrice": 1000,
    "count": 1
  }
]

const cart: Cart = {
  "id": "1",
  "products": dummyProducts,
  //"products": [],
  "allCount": 3,
  "allPrice": 3000
}

const delivery: Delivery = {
  "id": "1",
  "name": "大阪太郎",
  "postCode": "111-1111",
  "address1": "大阪府豊中市",
  "address2": "大阪府豊中市",
  "tel": "11-1111-1111",
  "default": true
}

const payment: Payment = {
  id: "1",
  paymentType: "CREDIT",
  cardCompany: "VISA",
  cardNumberMask: "XXXX-XXXX-XXXX-1234",
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "60px",
    },
  })
)

// 注文画面
const OrderPage: React.FC = () => {

  const classes = useStyles()
  //const sampleRef = React.createRef<Sample >(null);

  // ダイアログの表示状態を管理するstate
  const [open, setOpen] = useState(false)

  // API（カート情報取得）ができたら入れ替え
  // const [data, setCart] = useState({cart:[]});
  //const [data, setCart] = useState({cart: dummyCart});
  const [data, setData] = useState({ cart: cart, delivery: delivery});

  const fetchCart = async () => {
    // カード情報取
    // TODO 暫定でId「1」固定で取得
    axios.get(
      '/cart/1',
    ).then(result => {
      let allPrice = 0,allCount = 0
      result.data.products.forEach((element: CartProduct) => {
        allPrice += element.allPrice
        allCount += element.count
      });
      setData({cart: {...data.cart, allPrice: allPrice, allCount: allCount , products: result.data.products}, delivery: {...data.delivery}});
    }).catch(err =>{
      console.log(err)
    })
  };
  useEffect(() => {
    fetchCart();
  }, [setData]);


  const navigate = useNavigate()
  const forward = () => {
    setOpen(true)
  }
  const back = () => {
    navigate("/cart")
  }

  // 注文完了アクション
  const order = async () => {

    // console.log(OrderDelivery.callgetDeliveryInfo())

    const products: OrderProduct[] = []
    let orderPrice: number = 0 
    data.cart.products.forEach(element => {
      const orderProduct: OrderProduct = {...element,"url":""}
      orderPrice += element.price * element.count
      products.push(orderProduct)
    });

    const order: Order = {
      "products": products,
      "orderPrice": orderPrice,
      "delivery": data.delivery,
      "payment": payment,
      // TODO 以下はとりあえず固定
      "orderDate": "2021-01-01",
      "orderNo": "",
      "orderStatus": "ORDER_COMPLETE",
    }

    axios.post(
      '/order/',order
    ).catch(err =>{
      console.log(err)
    })

    navigate("/orderComplete")
  };

  // ダイアログを閉じる
  const cancel = () => {
    setOpen(false)
  };

  const popUp = (e:string) => {
    alert(e)
  }

  const ref = useRef();

  return (
    <Box className={classes.root}>
      <OrderItem cart={data.cart} />
      <OrderDelivery delivery={delivery}/>
      <OrderPayment />
      <NavigationButton forwardName="購入する" forward={forward} backName="カートへ戻る" back={back} />
      <OrderDialog openFlag={open} order={order} cancel={cancel} />
    </Box>
  )
}

export default OrderPage