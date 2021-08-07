import { useState } from "react";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { TableRow, TableCell, Collapse, Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// ******************* Material-UI Table *******************
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "Poppins",
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const useStyles = makeStyles({
  tableRow: {
    "&:hover": {
      backgroundColor: "#fffbf6",
    },
  },
  divContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  divCell: {
    padding: "5px",
    marginRight: "20px",
  },
  boldText: {
    fontWeight: 600,
    marginRight: "10px",
  },
});

// ################### Products Row ###################
const AllOrderRow = (props) => {
  const classes = useStyles();
  const { order } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Product Row */}

      <TableRow key={order.orderId} className={classes.tableRow}>
        <StyledTableCell>
          <IconButton
            aria-label='expand'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align='right'>{order.orderId}</StyledTableCell>
        <StyledTableCell align='right'>{order.userName}</StyledTableCell>
        <StyledTableCell align='right'>{order.trackNo}</StyledTableCell>
        <StyledTableCell align='right'>{order.recipient}</StyledTableCell>
        <StyledTableCell align='right'>{order.senderName}</StyledTableCell>
        <StyledTableCell align='right'>
          {order.createdAt.substring(0, 10)}
        </StyledTableCell>
        <StyledTableCell align='right'>{order.status}</StyledTableCell>
      </TableRow>

      {/* Product Details */}
      <TableRow className={classes.tableRow}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={2}>
              <h3>Order ID: {order.orderId}</h3>

              <div className='order-table'>
                <table>
                  <tr>
                    <th colSpan={6}>Order Details</th>
                  </tr>
                  <tr>
                    <th>product Id</th>
                    <td>{order.productId}</td>
                    <th>product Code</th>
                    <td>{order.productCode}</td>
                    <th>product Name</th>
                    <td>{order.productName}</td>
                  </tr>

                  <tr>
                    <th>Weight</th>
                    <td>{order.weight}</td>
                    <th>Size</th>
                    <td>
                      {order.width} * {order.height} * {order.length}
                    </td>
                    <th>price</th>
                    <td>{order.price}</td>
                  </tr>
                  <tr>
                    <th>track No.</th>
                    <td>{order.trackNo}</td>
                    <th>Status</th>
                    <td>{order.status}</td>
                    <th>cin7Id</th>
                    <td>{order.cin7Id}</td>
                  </tr>
                  <tr>
                    <th colSpan={6}>Recipient Details</th>
                  </tr>
                  <tr>
                    <th>Recipient</th>
                    <td>{order.recipient}</td>
                    <th>Phone Number</th>
                    <td>{order.recipientNumber}</td>
                    <th>Country</th>
                    <td>{order.recipientCountry}</td>
                  </tr>
                  <tr>
                    <th>Provience</th>
                    <td>{order.recipientProvience}</td>
                    <th>City</th>
                    <td>{order.recipientCity}</td>
                    <th>Address</th>
                    <td>{order.recipientAddr}</td>
                  </tr>
                  <tr>
                    <th colSpan={6}>Sender Details</th>
                  </tr>
                  <tr>
                    <th>Sender</th>
                    <td>{order.senderName}</td>
                    <th>Phone Number</th>
                    <td>{order.senderNumber}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{order.senderCountry}</td>
                    <th>City</th>
                    <td>{order.senderCity}</td>
                    <th>Address</th>
                    <td>{order.senderAddr}</td>
                  </tr>
                </table>
              </div>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

export default AllOrderRow;
