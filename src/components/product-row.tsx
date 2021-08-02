import axios from "axios";
import { useState } from "react";
import ConfirmDialog from "./confirm-dialog.component";
import ActionButton from "./controls/ActionButton";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { TableRow, TableCell, Collapse, Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

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
});

// ################### Products Row ###################
const ProductRow = (props) => {
  const classes = useStyles();
  const { item, openInPopup, setNotify } = props;
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<any>({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDelete = (prodId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios.delete("http://206.189.39.185:5031/api/Product/" + prodId);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      {/* Product Row */}
      <TableRow key={item.productId} className={classes.tableRow}>
        <StyledTableCell>
          <IconButton
            aria-label='expand'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>{item.productName}</StyledTableCell>
        <StyledTableCell align='right'>{item.desciption}</StyledTableCell>
        <StyledTableCell align='right'>{item.price}</StyledTableCell>
        <StyledTableCell align='right'>{item.weight}</StyledTableCell>
        <StyledTableCell align='right'>
          {item.length} * {item.width} * {item.height}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {item.createdAt.substring(0, 10)}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {/* Edit Button*/}
          <ActionButton color='edit'>
            <EditIcon
              fontSize='small'
              onClick={() => {
                openInPopup(item);
              }}
            />
          </ActionButton>

          {/* Delete Button */}
          <ActionButton color='delete'>
            <CloseIcon
              fontSize='small'
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this product?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    onDelete(item.productId);
                  },
                });
              }}
            />
          </ActionButton>
        </StyledTableCell>
        <StyledTableCell />
      </TableRow>

      {/* Product Details */}
      <TableRow className={classes.tableRow}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={8}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={2}>
              <li>
                <strong>Product Name: </strong>
                {item.productName}
              </li>

              <li>
                <strong>Product ID: </strong>
                {item.productId}
              </li>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>

      {/* Confirm Dialog */}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ProductRow;
