import { useState } from "react";
import { Errors } from "../../Interfaces/Errors";
import { Input } from "../controls/Input";

import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import "./products-form.style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialFormValues = {
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
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const validate = () => {
    let temp = {} as Errors;
    temp.productName =
      values.productName.length !== 0 ? "" : "This field is required.";
    // temp.length =
    //   values.length && /[0-9]/.test(values.length) ? "" : "Numbers only";
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      console.log("values:", values);
      console.log("errors:", errors);
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(initialFormValues);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <h2>Product Table Form Component</h2>
      <Grid container>
        <Grid item xs={6}>
          <Input
            label='Product Name'
            name='productName'
            value={values.productName}
            onChange={handleInputChange}
            error={errors["productName"]}
          />
          <Input
            name='productCode'
            label='Product Code'
            onChange={handleInputChange}
            value={values.productCode}
          />
          <Input
            name='desciption'
            label='Description'
            onChange={handleInputChange}
            value={values.desciption}
          />

          <Input
            name='imageUrl'
            label='Image URL'
            onChange={handleInputChange}
            value={values.imageUrl}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name='length'
            label='Length (cm)'
            onChange={handleInputChange}
            value={values.length}
            // error={errors["length"]}
          />
          <Input
            name='width'
            label='Width (cm)'
            onChange={handleInputChange}
            value={values.width}
          />
          <Input
            name='height'
            label='Height (cm)'
            onChange={handleInputChange}
            value={values.height}
          />
          <Input
            name='weight'
            label='Weight (kg)'
            onChange={handleInputChange}
            value={values.weight}
          />
          <Input
            name='packageQty'
            label='Package Quantity'
            onChange={handleInputChange}
            value={values.packageQty}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name='price'
            label='Price'
            onChange={handleInputChange}
            value={values.price}
          />
          <Input
            name='priceRrp'
            label='RRP Price'
            onChange={handleInputChange}
            value={values.priceRrp}
          />
          <Input
            name='priceAgent'
            label='Agent Price'
            onChange={handleInputChange}
            value={values.priceAgent}
          />
          <Input
            name='priceShopify'
            label='Shopify Price'
            onChange={handleInputChange}
            value={values.priceShopify}
          />
          <Input
            name='price1212'
            label='12-12 Price'
            onChange={handleInputChange}
            value={values.price1212}
          />
          <Input
            name='priceSpecial'
            label='Special Price'
            onChange={handleInputChange}
            value={values.priceSpecial}
          />
        </Grid>
        <div className='button-group products-btn-group'>
          <button className='button btn-primary' type='submit'>
            Submit
          </button>
          <button className='button btn-gray' onClick={resetForm}>
            Reset
          </button>
        </div>
      </Grid>
    </form>
  );
};

export default ProductsForm;
