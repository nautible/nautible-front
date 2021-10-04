// 届け先情報
export interface Delivery {
  id: string
  name: string
  postCode: string
  address1: string
  address2: string
  tel: string
  default: boolean
}

// 支払い情報
export interface Payment {
  id: string
  paymentType: ('クレジット'|'代引き'|'コンビニ払い'|'CREDIT')
  cardCompany: string
  cardNumberMask: string
}

// カード登録フォーム（未使用）
export interface CreditForm {
  cardNo: string
  name: string
  year: string
  month: string
  secret: string
}

// コンビニ支払い情報フォーム（未使用）
export interface ConvenienceForm {
  id: string
  name: string
}

export interface Order {
  orderNo: string
  orderDate: string
  orderPrice: number
  products: OrderProduct[]
  orderStatus: ('ORDER_COMPLETE'|'注文完了'|'配送準備中'|'配送中'|'配送完了'|'キャンセル')
  delivery: Delivery
  payment: Payment
}

// 注文商品
export interface OrderProduct {
  id: string
  name: string
  url: string
  image: string
  price: number
}