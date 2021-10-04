import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Price from '../atoms/price'

import {Product} from '../../types/product'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "60px",
      flexGrow: 1
    },
    grid: {
      display: "block",
    },
    name: {
      fontSize: 32,
      display: "flex",
    },
    stock: {
      fontSize: 18,
      display: "flex",
    },
    price: {
      display: "flex",
      fontSize: 18,
    },
    detail: {
      fontSize: 18,
      display: "flex",
    }
  })
)

// 商品の詳細画面で表示する商品コンポーネント
const ProductDetail: React.FC<Product> = (product) => {

  const classes = useStyles()

  return (
    <Grid className={classes.root} container>
      <Grid xs={4} sm={4} md={4} className={classes.grid}>
        <img src={"/item.png"} alt={"product"}/>
      </Grid>
      <Grid xs={6} sm={6} md={6} className={classes.grid}>
        <Typography className={classes.name}>{product.name}</Typography>
        <Typography className={classes.price}><Price className={classes.price} value={product.price} /></Typography>
        <Typography className={classes.detail}>{product.description}</Typography>
      </Grid>
    </Grid>
  )
}

export default ProductDetail