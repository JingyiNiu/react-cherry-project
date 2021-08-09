import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Input } from "../controls/Input";
import { Link } from "react-router-dom";

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

const RegisterForm = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon fontSize='large' />
        </Avatar>

        {/* Register Form */}
        <h2>Register</h2>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <Input label='Username *' fullWidth />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Input label='Password *' fullWidth />
            </Grid>

            {/* User Type */}
            <FormControl
              variant='outlined'
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id='user-type'>User Type *</InputLabel>
              <Select labelId='user-type' label='User Type * '>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>

            {/* Discount Rate */}
            <FormControl
              variant='outlined'
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id='discount-rate'>Discount Rate *</InputLabel>
              <Select labelId='discount-rate' label='Discount Rate * '>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>

            {/* Full Name */}
            <Grid item xs={12} sm={6}>
              <Input label='First Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label='Last Name' />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <Input label='Email' fullWidth />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <Input label='Phone Number' fullWidth />
            </Grid>

            {/* Company Name */}
            <Grid item xs={12}>
              <Input label='Company Name' fullWidth />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className={classes.submit}>
              <button className='button btn-primary button-full' type='submit'>
                Create a new account
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
