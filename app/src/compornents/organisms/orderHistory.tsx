// public Components
import React from 'react'

// Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// projet Components
import Price from '../atoms/price'

// typs
import { Order } from '../../types/order'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderHeader: {
      display: "flex",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    orderText: {
      display: "flex",
    },
    image: {
      width: "100px"
    },
    productGrid: {
      display: "flex",
    },
  })
)

// 注文履歴画面の１注文を表示するコンポーネント
const OrderHistory:React.FC<{order: Order}> = ({order}) => {

  const classes = useStyles()

  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12}>
        <Typography className={classes.orderHeader}>ご注文情報</Typography>
        <Typography className={classes.orderText}>注文番号：{order.orderNo}</Typography>
        <Typography className={classes.orderText}>注文日：{order.orderDate}</Typography>
      </Grid>
      <Grid xs={12} sm={12} md={12}>
        <Typography className={classes.orderHeader}>ご購入商品</Typography>
      </Grid>
      {order.products.map((product) => (
        <Grid className={classes.productGrid} xs={12} sm={12} md={12}>
          <Grid xs={4} sm={4} md={4}>
            <img className={classes.image} src={product.image} alt={"product"} />
          </Grid>
          <Grid xs={8} sm={8} md={8}>
          <Typography className={classes.orderText}>商品番号：{product.id}</Typography>
          <Typography className={classes.orderText}>商品名：{product.name}</Typography>
          <Typography className={classes.orderText}>購入価格：<Price value={product.price} /></Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>

  )
}

export default OrderHistory