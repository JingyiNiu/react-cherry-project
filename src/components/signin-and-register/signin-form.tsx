import { useState } from "react";
import { UserSigninError } from "../../Interfaces/UserSigninError";
import { Input } from "../controls/Input";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#d54c4c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      borderBottom: "1px solid",
    },
  },
}));

const initialFormValues = {
  userName: "",
  password: "",
};

const SigninForm = () => {
  const classes = useStyles();

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validate = () => {
    let temp = {} as UserSigninError;
    temp.userName =
      values.userName.length !== 0 ? "" : "This field is required.";
    temp.password =
      values.password.length !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFormValues);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        userName: values.userName,
        password: values.password,
      };
      console.log(data);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon fontSize='large' />
        </Avatar>

        {/* Signin Form */}
        <h2>Sign In</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <Input
                fullWidth
                name='userName'
                label='Username *'
                value={values.userName}
                onChange={handleInputChange}
                error={errors["userName"]}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Input
                fullWidth
                type='password'
                name='password'
                label='Password *'
                value={values.password}
                onChange={handleInputChange}
                error={errors["password"]}
              />
            </Grid>

            {/* Remember me */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className={classes.submit}>
              <button className='button btn-primary button-full' type='submit'>
                Sign In
              </button>
            </Grid>
          </Grid>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/register' className={classes.link}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SigninForm;
