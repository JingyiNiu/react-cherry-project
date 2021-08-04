import { useState, useEffect } from "react";
import AllOrderRow from "./all-order-row";

import { AllOrder } from "../../Interfaces/AllOrder";

import axios from "axios";

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
} from "@material-ui/core";

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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#fffbf6",
    },
  },
});

// ################### All Orders ###################
const AllOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    getAllOrders();
  }, [orders]);

  const getAllOrders = () => {
    const ordersList: AllOrder[] = [];
    const url =
      "http://206.189.39.185:5031/api/Order/GetOrderList/userId/status?status=9";
    axios.get(url).then((response) => {
      response.data.data.forEach((item: any) => {
        ordersList.push(item);
      });
      setOrders(ordersList);
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
      id: "orderId",
      label: "Order ID",
      numeric: false,
      disableSorting: false,
    },
    {
      id: "userName",
      label: "User Name",
      numeric: false,
      disableSorting: false,
    },
    {
      id: "trackNo",
      label: "Track No",
      numeric: false,
      disableSorting: false,
    },
    {
      id: "recipient",
      label: "Recipient",
      numeric: false,
      disableSorting: false,
    },
    {
      id: "senderName",
      label: "Sender",
      numeric: false,
      disableSorting: false,
    },
    {
      id: "createdAt",
      label: "Created At",
      numeric: false,
      disableSorting: false,
    },
    { id: "status", label: "Status", numeric: false, disableSorting: false },
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
  const [filterFunction] = useState({
    func: (orders) => {
      return orders;
    },
  });

  const ordersAfterPagingAndSoring = () => {
    return stableSort(
      filterFunction.func(orders),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  // ################### Orders Table ###################
  return (
    <div>
      <h2>All Orders</h2>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='collapsible table'>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {/* Table Cell */}
              <StyledTableCell />
              {headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align={headCell.numeric ? "left" : "right"}
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
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {ordersAfterPagingAndSoring().map((order) => (
              <AllOrderRow key={order.orderId} order={order} />
            ))}
          </TableBody>
        </Table>

        {/* Table Pagination */}
        <TablePagination
          component='div'
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={rowsPerPage}
          count={orders.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default AllOrders;
