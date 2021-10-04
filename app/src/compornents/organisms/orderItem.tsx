import React from 'react';

import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Price from '../atoms/price'

import {Cart} from '../../types/cart'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  table: {
    minWidth: 600,
  },
  image: {
    width: "50px"
  }
})
)

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

// 注文画面で表示する商品コンポーネント
const OrderItem: React.FC<{cart: Cart}> = ({cart}) => {

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">画像</StyledTableCell>
            <StyledTableCell align="left">商品名</StyledTableCell>
            <StyledTableCell align="center">数量</StyledTableCell>
            <StyledTableCell align="center">単価</StyledTableCell>
            <StyledTableCell align="center">合計金額</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell align="center">
                <img className={classes.image} src={product.image} alt={"product"} />
              </StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="center">{product.count}</StyledTableCell>
              <StyledTableCell align="center"><Price value={product.price} /></StyledTableCell>
              <StyledTableCell align="center"><Price value={product.allPrice} /></StyledTableCell>
            </StyledTableRow>
          ))}
         <StyledTableRow>
            <StyledTableCell colSpan={2} align="left">
              合計
            </StyledTableCell>
            <StyledTableCell align="center">
              {cart.allCount}点
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">
              <Price value={cart.allPrice} />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderItem