import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
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
import BlankPage from './compornents/pages/blankPage'
import AuthService from "./services/AuthService"
import HttpServiceConfigurator from "./services/HttpServiceConfigurator"

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

  const [data, setAuth] = useState({authenticated: false});

  const init = async () => {
    const onAuthenticatedCallback = async (authenticated: boolean) => {
      setAuth({ authenticated })
      HttpServiceConfigurator.configure()
    }
    AuthService.init(onAuthenticatedCallback);
  };
  useEffect(() => {
    init();
  }, [setAuth]);

  return (

    <Router>
        <Box className={classes.root}>
          <Header />
          { data.authenticated &&
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/productDetail/:id" element={<ProductDetailPage />} />
            <Route path="/cart/" element={<CartPage />} />
            <Route path="/order/" element={<OrderPage />} />
            <Route path="/orderComplete/" element={<OrderCompletePage />} />
            <Route path="/orderHistory/" element={<OrderHistoryPage />}/>
          </Routes>
          }
          { !data.authenticated &&
            <BlankPage />
          }
          <Footer />
        </Box>
    </Router>
  );
}

export default App;
