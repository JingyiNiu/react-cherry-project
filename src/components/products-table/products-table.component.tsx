import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../Product";
import ProductsForm from "../products-form/products-form.component";

import {
  withStyles,
  Theme,
  useTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import "./products-table.style.css";

const ProductsTable = () => {
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

  // ************** Material-UI Table **************
  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      root: {
        fontFamily: "Poppins",
      },
      head: {
        backgroundColor: "#d54c4c",
        color: theme.palette.common.white,
        fontSize: 16,
      },
      body: {
        fontSize: 14,
      },
    })
  )(TableCell);

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        "&:nth-of-type(even)": {
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

  // ************** Material-UI Table Pagination**************
  const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      },
    })
  );

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='first page'
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='last page'
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <ProductsForm />
      <h2>Product Table Component</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align='right'>Description</StyledTableCell>
              <StyledTableCell align='right'>Price</StyledTableCell>
              <StyledTableCell align='right'>Weight</StyledTableCell>
              <StyledTableCell align='right'>L × W × H </StyledTableCell>
              <StyledTableCell align='right'>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? products.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : products
            ).map((product, index) => {
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
                  <StyledTableCell align='right'></StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5, 15, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsTable;
