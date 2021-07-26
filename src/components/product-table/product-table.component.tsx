import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../Product";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./product-table.style.css";

const ProductTable = () => {
  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = () => {
    const productsList: Product[] = [];
    const url = "http://206.189.39.185:5031/api/Product";
    axios.get(url).then((response) => {
      response.data.data.forEach((item: any) => {
        productsList.push(item);
      });
      setProducts(productsList);
    });
  };

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: "#d54c4c",
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    })
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })
  )(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <div>
      <h2>product table</h2>
      {/* {products.map((product, index) => (
        <p key={index}>{product.productName}</p>
      ))} */}
      <TableContainer component={Paper}>
        <Table
          className='`${classes.table} myProductTable`'
          aria-label='simple table'
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align='right'>Description</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell align='right'>Weight</StyledTableCell>
              <StyledTableCell align='right'>
                Length * Width * Height{" "}
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component='th' scope='row'>
                    {product.productName}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.desciption}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.weight}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.length} * {product.width} * {product.height}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
