import { NumberLiteralType } from "typescript";

// カート情報
export interface Cart {
  id: string
  products: CartProduct[]
  allCount: number
  allPrice: number
}

// カート内商品情報
export interface CartProduct {
  id: string
  image: string
  name: string
  price: number
  count: number
  allPrice: number
}

export interface State {
  count: number
  product: CartProduct[]
}
export interface Action {
  type: 'insert' | 'delete'
}