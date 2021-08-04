import { useState, useEffect } from "react";

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
  Toolbar,
  InputAdornment,
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
                  align={headCell.numeric ? "right" : "left"}
                >
                  {/* Table Sort Label */}
                  {headCell.disableSorting ? (
                    headCell.label
                  ) : (
                    <TableSortLabel>{headCell.label}</TableSortLabel>
                  )}
                </StyledTableCell>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllOrders;
