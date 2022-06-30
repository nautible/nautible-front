import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ProductList from '../organisms/productList'
import {Product} from '../../types/product'

// ダミーデータ
const dummyProducts: Product[] = [
  {
    "id": "1",
    "name": "kubernetes完全ガイド",
    "maker": "Impress",
    "price": 1000,
    "description": "kubernetesです"
  },
  {
    "id": "2",
    "name": "kubernetes実践ガイド",
    "maker": "Impress",
    "price": 1000,
    "description": "kubernetesです"
  },
  {
    "id": "3",
    "name": "実践Typescript",
    "maker": "Impress",
    "price": 1000,
    "description": "kubernetesです"
  },
  {
    "id": "4",
    "name": "入門Prometheus",
    "maker": "Impress",
    "price": 1000,
    "description": "kubernetesです"
  }
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
  products: Product[];
}

// 商品一覧画面
const ProductListPage: React.FC = () => {
  // const ProductListPage: React.FC<{keycloak: KeycloakInstance}> = ({keycloak}) => {

  // console.log(keycloak.loadUserInfo())

  // axios.interceptors.request.use((config) => {
  //       config.headers.Authorization = `Bearer ${keycloak.token}`;
  //       return Promise.resolve(config);
  // });

  const classes = useStyles()

  // APIができたら入れ替え
  const [data, setProducts] = useState<Product[]>([]);

  const fetchProduct = async () => {
    axios.get(
      '/product/',
    ).then(result => {
      setProducts(result.data)
    }).catch(err =>{
      console.log(err)
    })    
  };
  useEffect(() => {
    fetchProduct();
  }, [setProducts]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((product: Product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductList product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductListPage