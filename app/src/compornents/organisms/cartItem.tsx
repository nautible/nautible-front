import React from 'react'

import { withStyles, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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


// カート画面で表示する商品コンポーネント
const CartItem: React.FC<{cart: Cart, handleChange: (productId: string, count: number) => void, handleDelete: (productId: string) => void}> = ({cart, handleChange, handleDelete}) => {

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
            <StyledTableCell>&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products && cart.products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell align="center">
                <img className={classes.image} src={product.image} alt={"product"} />
              </StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Select value={product.count} onChange={event => handleChange(product.id, Number(event.target.value))}>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell align="center"><Price value={product.price} /></StyledTableCell>
              <StyledTableCell align="center"><Price value={product.allPrice} /></StyledTableCell>
              <StyledTableCell align="center">
                <Button value={product.id} onClick={event => handleDelete(product.id)}>削除</Button>
              </StyledTableCell>
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
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartItem