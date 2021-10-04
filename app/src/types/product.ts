// 商品情報
export interface Product {
  id: string
  name: string
  maker: string
  price: number
  description: string
}

export interface ProductDetail {
  id: string
  name: string
  url: string
  image: string
  upperPrice: number
  price: number
  stockCount: number
  detail: string
}