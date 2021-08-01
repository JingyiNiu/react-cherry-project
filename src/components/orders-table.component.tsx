import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../Interfaces/Product";
import ProductsForm from "./products-form.component";
import PopupDialog from "./popup-dialoge/popup-dialoge.component";
import Notification from "./notification.component";
import { Input } from "./controls/Input";

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
  Collapse,
  Box,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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
      "&:nth-of-type(even)": {},
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#fffbf6",
    },
  },
  searchInput: {
    width: "60%",
  },
  toolbar: {
    marginBottom: "20px",
  },
  addButton: {
    position: "absolute",
    right: "10px",
  },
});

// ################### Order Row ###################
const OrderRow = (props) => {
  const { item } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow key={item.productId}>
        {/* Order Row */}
        <StyledTableCell>
          <IconButton
            aria-label='expand'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
        <StyledTableCell align='right'></StyledTableCell>
      </StyledTableRow>

      {/* Order Details */}
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={2}></Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

// ################### Products Table ###################
const OrdersTable = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, [products]);

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
    {
      id: "createdAt",
      numeric: true,
      label: "Created At",
      disableSorting: false,
    },
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
        if (target.value === "") return products;
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

  // ******************* Popup Dialog *******************
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  // ******************* Notification *******************
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // ******************* Confirm Dialog *******************
  const [confirmDialog, setConfirmDialog] = useState<any>({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // ******************* Return *******************
  return (
    <div>
      {/* Top Bar */}
      <Toolbar className={classes.toolbar}>
        {/* Search Bar */}
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

        {/* Add New Button */}
        <button
          className={`button btn-primary ${classes.addButton}`}
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          + New Product
        </button>
      </Toolbar>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='collapsible table'>
          {/* Table Head */}
          <TableHead>
            <StyledTableRow>
              {/* Table Cell */}
              <StyledTableCell />
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
              <StyledTableCell />
            </StyledTableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {productsAfterPagingAndSoring().map((item) => (
              <OrderRow
                key={item.productId}
                item={item}
                openInPopup={openInPopup}
                notify={notify}
                setNotify={setNotify}
                confirmDialog={confirmDialog}
              />
            ))}
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

      {/* Popup Dialog */}
      <PopupDialog
        title='Add New Product'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductsForm
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setNotify={setNotify}
        />
      </PopupDialog>

      {/* Notification */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default OrdersTable;
