// public Components
import React from 'react'
import { Link } from "react-router-dom";

// Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// projet Components
import Price from '../atoms/price'

// typs
import {Product} from '../../types/product'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: "2px",
    },
    productContent: {
      backgroundColor: theme.palette.common.white,
      padding: '(8, 0, 6)',
    },
    productButtons: {
      marginTop: '4px',
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      maxWidth: '150px',
      paddingTop: '10px',
    },
    cardContent: {
      flexGrow: 1,
    },
  })
)

// 商品の一覧画面で表示する商品コンポーネント
const ProductList:React.FC<{product: Product}> = ({product}) => {

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link to={"/productDetail/" + product.id}>
        <CardMedia component="img" className={classes.cardMedia} image="/item.png" title="item" />
      </Link>
      <CardContent className={classes.cardContent}>
        <CardContent className={classes.cardContent}>
          <Price value={product.price} />
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  )
}

export default ProductList