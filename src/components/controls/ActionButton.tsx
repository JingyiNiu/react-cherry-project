import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  edit: {
    backgroundColor: "#B8DFD8",
    "& .MuiButton-label": {
      color: "#3C8DAD",
    },
  },
  delete: {
    backgroundColor: "#fcd8d4",
    "& .MuiButton-label": {
      color: "#d54c4c",
    },
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}
