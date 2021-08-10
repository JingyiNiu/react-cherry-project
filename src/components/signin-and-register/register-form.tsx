import { useState, useEffect } from "react";
import { Input } from "../controls/Input";
import { Link } from "react-router-dom";
import { UserRegister } from "../../Interfaces/UserRegister";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialFormValues = {
  userName: "",
  password: "",
  confirmPassword: "",
  type: "",
  discountRate: "",
  firstName: "",
  lastName: "",
  companyName: "",
  mobileNumber: "",
  email: "",
};

const RegisterForm = () => {
  const classes = useStyles();

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = () => {};

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      userName: values.userName,
      password: values.password,
      type: parseInt(values.type),
      discountRate: parseInt(values.discountRate),
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      mobileNumber: values.mobileNumber,
      email: values.email,
    };
    console.log(data);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon fontSize='large' />
        </Avatar>

        {/* Register Form */}
        <h2>Register</h2>
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
              />
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <Input
                fullWidth
                type='password'
                name='confirmPassword'
                label='Confirm Password *'
                value={values.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>

            {/* User Type */}
            <FormControl
              fullWidth
              variant='outlined'
              className={classes.formControl}
            >
              <InputLabel id='user-type'>User Type *</InputLabel>
              <Select
                labelId='user-type'
                label='User Type * '
                name='type'
                value={values.type}
                onChange={handleInputChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>

            {/* Discount Rate */}
            <FormControl
              fullWidth
              variant='outlined'
              className={classes.formControl}
            >
              <InputLabel id='discount-rate'>Discount Rate *</InputLabel>
              <Select
                labelId='discount-rate'
                label='Discount Rate * '
                name='discountRate'
                value={values.discountRate}
                onChange={handleInputChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>

            {/* Full Name */}
            <Grid item xs={12} sm={6}>
              <Input
                label='First Name'
                name='firstName'
                value={values.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label='Last Name'
                name='lastName'
                value={values.lastName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <Input
                fullWidth
                label='Email'
                name='email'
                value={values.email}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <Input
                fullWidth
                label='Phone Number'
                name='mobileNumber'
                value={values.mobileNumber}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Company Name */}
            <Grid item xs={12}>
              <Input
                fullWidth
                label='Company Name'
                name='companyName'
                value={values.companyName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className={classes.submit}>
              <button className='button btn-primary button-full' type='submit'>
                Create A New Account
              </button>
            </Grid>
          </Grid>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/signin' className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;
