import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { useNavigate } from "react-router-dom";

import CartItem from '../organisms/cartItem'
import NavigationButton from '../molecules/navigationButton'
import {Cart, CartProduct} from '../../types/cart'

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
  "products": [],
  "allCount": 0,
  "allPrice": 0
}

const dummyCart: Cart = {
  "id": "1",
  "products": dummyProducts,
  "allCount": 3,
  "allPrice": 3000
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "60px",
    },
  })
)

// カート画面
const CartPage: React.FC = () => {

  const classes = useStyles()

  // API（カート情報取得）ができたら入れ替え
  //const [data, setCart] = useState({ cart: [] });  
  // const [data, setCart] = useState({cart: dummyCart});
  const [data, setCart] = useState({cart: cart});
  //const [state, dispatch] = useReducer(reducer, initialState)
  const fetchCart = async () => {
    // カート情報取得 TODO 暫定でId「1」固定で取得
    axios.get(
      '/cart/1',
    ).then(result => {
      if(!result.data){
        return;
      }
      const cartCopy = {...data.cart}
      cartCopy.products = result.data.products
      calcAllCountAndPrice(cartCopy)
      setCart({cart: {...cartCopy}})  
    }).catch(err =>{
      console.log(err)
    })
  };
  useEffect(() => {
    fetchCart();
  }, [setCart]);

  // カートの数量変更
  const itemCountChange = (productId: string, count: number) => {
    const productsCopy:CartProduct[] = []
    data.cart.products.forEach(element => {
      if (String(element.id) === String(productId)) {
        const modProduct = {...element}
        modProduct.count = count
        modProduct.allPrice = element.price * count
        productsCopy.push(modProduct)
      } else {
        productsCopy.push(element)
      }
    })
    const cartCopy = {...data.cart}
    cartCopy.products = productsCopy
    calcAllCountAndPrice(cartCopy)
    setCart({cart: {...cartCopy }})

    // カート情報情報更新
    axios.put(
      '/cart/',cartCopy
    ).catch(err =>{
      console.log(err)
    })
    
  };

  // カート商品削除
  const itemDelete = ( productId: string) => {
    alert("削除します")
    var filterProducts = data.cart.products.filter(element => (element.id !== productId))
    data.cart.products = filterProducts
    const cartCopy = {...data.cart}
    cartCopy.products = filterProducts
    calcAllCountAndPrice(cartCopy)
    setCart({cart: {...cartCopy}})

    axios.put(
      '/cart/',cartCopy
    ).catch(err =>{
      console.log(err)
    })
  }

   // カート合計計算
  const calcAllCountAndPrice = (cart: Cart) => {
    let allCount = 0,allPrice = 0
    if(cart.products){
        cart.products.forEach(element => {
        allCount += element.count
        allPrice += element.allPrice
      })  
    }
    cart.allCount = allCount
    cart.allPrice = allPrice
  }

  const navigate = useNavigate()
  const forward = () => {
    navigate("/order")
  }
  const back = () => {
    navigate("/")
  }
  return (
    <div className={classes.root}>
      <CartItem cart={data.cart} handleChange={itemCountChange} handleDelete={itemDelete} />
      <NavigationButton forwardName="購入へ進む" forward={forward} backName="商品一覧へ戻る" back={back} />
    </div>
  )
}

export default CartPage