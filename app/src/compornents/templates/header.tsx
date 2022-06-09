// public Compornents
import React from 'react'
import { Link, useHistory } from "react-router-dom"

// Material-UI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CartIcon from '@material-ui/icons/ShoppingCart'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import Button from '@material-ui/core/Button'
import AuthService from "./../../services/AuthService"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '45px',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    appBar: {
      position: 'absolute',
      marginLeft: '0px',
    },
    toolBar: {
      width: 'drawerWidth',
    },
    headerLogo: {
      display: 'flex',
      height: '35px',
    },
    headerMenu: {
      display: 'flex',
      marginLeft: 'auto',
      height: '35px',
    },
  })
)

// ヘッダ
const HeaderNavigation: React.FC = () => {

  const classes = useStyles()

  const history = useHistory()
  const linkCart = () => {
    history.push("/cart")
  }
  const linkOrderHistory = () => {
    history.push("/orderHistory")
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolBar} variant="dense">
          {
            //ホームボタン
          }
          <Link to="/">
            <Typography color="inherit" noWrap>
              <img src="/logo.png" alt="nautible" className={classes.headerLogo}/>
            </Typography>
          </Link>
          { AuthService.getToken() != null &&
          <div className={classes.headerMenu}>
            {
              //カートボタン
            }
            <IconButton color="inherit" aria-label="Open Share">
              <Typography variant="button" color="inherit" noWrap>
                <CartIcon onClick={linkCart} />
              </Typography>
            </IconButton>
            {
              //購入履歴ボタン
            }
            <IconButton color="inherit" aria-label="Open Share">
              <Typography variant="button" color="inherit" noWrap>
                <LibraryBooksIcon onClick={linkOrderHistory} />
              </Typography>
            </IconButton>
            { AuthService.getToken() != null &&
            <Button variant="contained" color="default" onClick={() => AuthService.logout()}>
                ログアウト
            </Button>
            }
          </div>
          }
          { AuthService.isAuthEnable() && AuthService.getToken() == null &&
          <div className={classes.headerMenu}>
            <Button variant="contained" color="default" onClick={() => AuthService.login()}>
                ログイン
            </Button>
          </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HeaderNavigation