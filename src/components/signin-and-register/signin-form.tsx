import { useState } from "react";
import { UserSigninError } from "../../Interfaces/UserSigninError";
import { Input } from "../controls/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import Notification from "../notification";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createTrue } from "typescript";

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

const SigninForm = (props) => {
  const { currentUser, setCurrentUser } = props;
  const [rememberMe, setRememberMe] = useState(false);

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

    return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRememberMe = (e) => {
    setRememberMe(!rememberMe);
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
      axios
        .post("http://206.189.39.185:5031/api/User/UserLogin", data)
        .then((response) => {
          setNotify({
            isOpen: true,
            message: "Signed In Successfully",
            type: "success",
          });
          resetForm();
          setCurrentUser(response.data.data);
          if (rememberMe === true)
            localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("tokenCreatedAt", new Date().toISOString());
        })
        .catch((error) => {
          console.log(error);
          setNotify({
            isOpen: true,
            message: "Sign in error. Please try again",
            type: "error",
          });
        });

      resetForm();
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
                control={
                  <Checkbox
                    color='primary'
                    name='rememberMe'
                    onChange={handleRememberMe}
                    checked={rememberMe}
                  />
                }
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

      {/* Notification */}
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
};

export default SigninForm;
