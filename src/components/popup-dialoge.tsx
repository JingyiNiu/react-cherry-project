import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ActionButton from "./controls/ActionButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

const PopupDialog = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth='md'
      classes={{ paper: classes.dialogWrapper }}
    >
      {/* Popup Header */}
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          {/* Popup Title */}
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {/* Close Button */}
          <ActionButton
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>

      {/* Popup Content */}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
