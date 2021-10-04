import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Header from './compornents/templates/header'
import Footer from './compornents/templates/footer'
import ProductListPage from './compornents/pages/productListPage'
import ProductDetailPage from './compornents/pages/productDetailPage'
import CartPage from './compornents/pages/cartPage'
import OrderPage from './compornents/pages/orderPage'
import OrderCompletePage from './compornents/pages/orderCompletePage'
import OrderHistoryPage from './compornents/pages/orderHistoryPage'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      minHeight: "100vh",
      position: "relative",
      paddingBottom: "20px",
      boxSizing: "border-box"
    }
  })
)

const App: React.FC = () => {

  const classes = useStyles()

  return (
    <Router>
      <Box className={classes.root}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <ProductListPage />
          </Route>
          <Route path="/productDetail/:id" exact>
            <ProductDetailPage />
          </Route>
          <Route path="/cart/" exact>
            <CartPage />
          </Route>
          <Route path="/order/" exact>
            <OrderPage />
          </Route>
          <Route path="/orderComplete/" exact>
            <OrderCompletePage />
          </Route>
          <Route path="/orderHistory/" exact>
            <OrderHistoryPage />
          </Route>
        </Switch>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
