import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ProductDetail from '../organisms/productDetail'
import ProductInputDialog from '../templates/productInputDialog'
import {Product} from '../../types/product'
import NavigationButton from '../molecules/navigationButton'
import {Cart, CartProduct} from '../../types/cart'

const dummyProduct: Product = {
    "id": "1",
    "name": "Kubernetes完全ガイド",
    "maker": "Impress",
    "price": 1000,
    "description": "Kubernetes解説書の決定版がついに改訂!Kubernetesはコンテナ化されたアプリケーションのデプロイ、スケーリングなどの管理を自動化する「コンテナオーケストレーションエンジン」です。「クラウドネイティブ」を実現するためのコア技術として、現在多くのシステムでの利用が進んでいます。本書では、アプリケーション開発者やインフラエンジニアを対象に、Kubernetesの機能やそのエコシステムについて網羅的に解説します。好評をいただいた前版を全面的に見直し、バージョン1.18に対応しました(アルファ機能を含む)。前版以降に追加された機能や変更点にも言及し、最新のKubernetesを活用するための多くの知見を提供します。これまでKubernetesを触ったことがない方でもそのコンセプトを理解し、実際にアプリケーションをコンテナ化して実行できるようになることを目標としています。"
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "60px",
    },
  })
)

interface ParamTypes {
  id: string
}

// 商品詳細画面
const ProductDetailPage: React.FC = () => {

  const classes = useStyles()
  const location = useLocation()

  // APIができたら入れ替え
  //const {id} = useParams<ParamTypes>()
  //const [data, setProduct] = useState({ product: '' });
  const navigate = useNavigate()
  const [data, setProduct] = useState<Product>({id: '', name: '', maker: '', price: 0, description: ''});

  // 商品詳細情報の取得
  const fetchProductDetail = async () => {
    const productId = location.pathname.split('/').slice(-1)[0]
    axios.get(
      "/product/" + productId,
    ).then(result => {
      setProduct(result.data)
    }).catch(err =>{
      console.log(err)
    })
  };
  useEffect(() => {
    fetchProductDetail();
  }, [setProduct]);

  // ダイアログの表示状態を管理するstate
  const [open, setOpen] = useState(false)

  // カート投入アクション
  const inputCart = async () => {
    let cart:Cart;
    // カード情報取
    // TODO 暫定でId「1」固定で取得
    axios.get(
      '/cart/1',
    ).then(result => {
      if(result.data) {
        cart = result.data
      } else {
        cart = {
          "id": "1",// TODO 暫定でId「1」固定
          "products": [],
          "allCount": 0,
          "allPrice": 0
        }
      }
      // カートに存在しない場合は追加する
      if(!cart.products || (cart.products.filter(element => (String(element.id) === String(data.id))).length === 0 )){  
        const cartProduct : CartProduct = {...data, image: "/item.png", count: 1, allPrice: data.price }
        if(cart.products) {
          cart.products.push(cartProduct)
        }else{
          cart.products = [cartProduct]
        }
        axios.post(
          '/cart/',cart
        ).catch(err =>{
          console.log(err)
        })
      }
    }).catch(err =>{
      console.log(err)
    })
    
    // 正常応答時はsetOpen(true)
    setOpen(true)
  }

  // カート画面へ進む
  const forward = () => {
    navigate("/cart")
  };

  // 商品一覧に戻る
  const back = () => {
    navigate("/")
  };

  return (
    <div className={classes.root}>
      <ProductDetail {...data} />
      <NavigationButton forwardName="購入フロー" forward={inputCart} backName="商品一覧へ戻る" back={back} />
      <ProductInputDialog openFlag={open} forward={forward} back={back} />
    </div>
  )
}
export default ProductDetailPage