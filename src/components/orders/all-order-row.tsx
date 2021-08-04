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

              {/* User Details */}
              <div className={classes.divContainer}>
                <div className={classes.divCell}>
                  <span className={classes.boldText}>User Name</span>
                  {order.userName}
                </div>
                <div className={classes.divCell}>
                  <span className={classes.boldText}>Email</span>
                  {order.userEmail}
                </div>
                <div className={classes.divCell}>
                  <span className={classes.boldText}>First Name</span>
                  {order.userFirstName}
                </div>
                <div className={classes.divCell}>
                  <span className={classes.boldText}>Last Email</span>
                  {order.userLastName}
                </div>
                <div className={classes.divCell}>
                  <span className={classes.boldText}>Company Name</span>
                  {order.userCompanyName}
                </div>
              </div>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

export default AllOrderRow;
