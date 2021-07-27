import { useState, useEffect } from "react";
import { Product } from "../../Product";
import "./products-form.style.css";

import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialFormValues: Product = {
  productName: "",
  productCode: "",
  imageUrl: "",
  desciption: "",
  price: 0,
  priceRrp: 0,
  priceShopify: 0,
  priceAgent: 0,
  price1212: 0,
  priceSpecial: 0,
  height: 0,
  width: 0,
  length: 0,
  weight: 0,
  packageQty: 0,
};

const ProductsForm = () => {
  const [values, setValues] = useState(initialFormValues);
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <h2>Product Table Form Component</h2>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            name='productName'
            label='Product Name'
            value={values.productName}
          />
          <TextField
            variant='outlined'
            name='productCode'
            label='Product Code'
            value={values.productCode}
          />
          <TextField
            variant='outlined'
            name='description'
            label='Description'
            value={values.desciption}
          />

          <TextField
            variant='outlined'
            name='imageUrl'
            label='Image URL'
            value={values.imageUrl}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant='outlined'
            name='length'
            label='Length (cm)'
            value={values.length}
          />
          <TextField
            variant='outlined'
            name='width'
            label='Width (cm)'
            value={values.width}
          />
          <TextField
            variant='outlined'
            name='height'
            label='Height (cm)'
            value={values.height}
          />
          <TextField
            variant='outlined'
            name='weight'
            label='Weight (kg)'
            value={values.weight}
          />
          <TextField
            variant='outlined'
            name='packageQty'
            label='Package Quantity'
            value={values.packageQty}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant='outlined'
            name='price'
            label='Price'
            value={values.price}
          />
          <TextField
            variant='outlined'
            name='priceRrp'
            label='RRP Price'
            value={values.priceRrp}
          />
          <TextField
            variant='outlined'
            name='priceAgent'
            label='Agent Price'
            value={values.priceAgent}
          />
          <TextField
            variant='outlined'
            name='priceShopify'
            label='Shopify Price'
            value={values.priceShopify}
          />
          <TextField
            variant='outlined'
            name='price1212'
            label='12-12 Price'
            value={values.price1212}
          />
          <TextField
            variant='outlined'
            name='priceSpecial'
            label='Special Price'
            value={values.priceSpecial}
          />
        </Grid>
        <div className='button-group products-btn-group'>
          <button className='button btn-primary' type='submit'>
            Submit
          </button>
          <button className='button btn-gray'>Reset</button>
        </div>
      </Grid>
    </form>
  );
};

export default ProductsForm;
