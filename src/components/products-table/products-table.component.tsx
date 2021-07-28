import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../../Interfaces/Product";
import ProductsForm from "../products-form/products-form.component";
import { Input } from "../controls/Input";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import "./products-table.style.css";

// ******************* Material-UI Table *******************
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
  searchInput: {
    width: "50%",
  },
  toolbar: {
    marginBottom: "20px",
  },
});

const ProductsTable = () => {
  useEffect(() => {
    getProducts();
  }, []);

  const classes = useStyles();
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

  interface HeadCell {
    id: string;
    label: string;
    numeric: boolean;
    disableSorting: boolean;
  }
  const headCells: HeadCell[] = [
    {
      id: "productName",
      numeric: false,
      label: "Product Name",
      disableSorting: false,
    },
    {
      id: "desciption",
      numeric: true,
      label: "Description",
      disableSorting: false,
    },
    { id: "price", numeric: true, label: "Price", disableSorting: false },
    { id: "weight", numeric: true, label: "Weight", disableSorting: false },
    { id: "size", numeric: true, label: "L × W × H", disableSorting: false },
    { id: "actions", numeric: true, label: "Actions", disableSorting: true },
  ];
  // ******************* Pagination *******************
  const pages = [10, 15, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ******************* Sorting *******************
  const [order, setOrder] = useState<any>();
  const [orderBy, setOrderBy] = useState<any>();

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // ******************* Filter *******************
  const [filterFunction, setFilterFunction] = useState({
    func: (products) => {
      return products;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      func: (products) => {
        if (target.value == "") return products;
        else
          return products.filter((product) =>
            product.productName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const productsAfterPagingAndSoring = () => {
    return stableSort(
      filterFunction.func(products),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <div>
      {/* <Form /> */}
      {/* <ProductsForm /> */}

      {/* Search Bar */}
      <Toolbar className={classes.toolbar}>
        <Input
          label='Search Products'
          className={classes.searchInput}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          {/* Table Head */}
          <TableHead>
            <StyledTableRow>
              {/* Table Cell */}
              {headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {/* Table Sort Label */}
                  {headCell.disableSorting ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => {
                        handleSortRequest(headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {productsAfterPagingAndSoring().map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{item.productName}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.desciption}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.price}</StyledTableCell>
                  <StyledTableCell align='right'>{item.weight}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.length} * {item.width} * {item.height}
                  </StyledTableCell>
                  <StyledTableCell align='right'></StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Table Pagination */}
        <TablePagination
          component='div'
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={products.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ProductsTable;
