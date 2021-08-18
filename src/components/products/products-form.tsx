import { useState, useEffect } from "react";
import { Product } from "../../Interfaces/Product";
import { Input } from "../controls/Input";
import { ProductError } from "../../Interfaces/ProductError";

import { makeStyles, Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialFormValues = {
  productId: "",
  productName: "",
  productCode: "",
  imageUrl: "",
  desciption: "",
  price: "",
  priceRrp: "",
  priceShopify: "",
  priceAgent: "",
  price1212: "",
  priceSpecial: "",
  height: "",
  width: "",
  length: "",
  weight: "",
  packageQty: "",
};

const ProductsForm = (props) => {
  const { setOpenPopup, recordForEdit, setNotify, axiosWithToken } = props;

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState<any>(null);

  const classes = useStyles();

  const validate = () => {
    let temp = {} as ProductError;
    temp.productName =
      values.productName.length !== 0 ? "" : "This field is required.";
    if (values.length) {
      temp.length = /^[0-9]+$/.test(values.length) ? "" : "Integer only";
    }
    if (values.width) {
      temp.width = /^[0-9]+$/.test(values.width) ? "" : "Integer only";
    }
    if (values.height) {
      temp.height = /^[0-9]+$/.test(values.height) ? "" : "Integer only";
    }
    if (values.weight) {
      temp.weight = /^[0-9]+$/.test(values.weight) ? "" : "Integer only";
    }
    if (values.packageQty) {
      temp.packageQty = /^[0-9]+$/.test(values.packageQty)
        ? ""
        : "Integer only";
    }
    if (values.price) {
      temp.price = /^[0-9]+$/.test(values.price) ? "" : "Integer only";
    }
    if (values.priceRrp) {
      temp.priceRrp = /^[0-9]+$/.test(values.priceRrp) ? "" : "Integer only";
    }
    if (values.priceAgent) {
      temp.priceAgent = /^[0-9]+$/.test(values.priceAgent)
        ? ""
        : "Integer only";
    }
    if (values.priceShopify) {
      temp.priceShopify = /^[0-9]+$/.test(values.priceShopify)
        ? ""
        : "Integer only";
    }
    if (values.price1212) {
      temp.price1212 = /^[0-9]+$/.test(values.price1212) ? "" : "Integer only";
    }
    if (values.priceSpecial) {
      temp.priceSpecial = /^[0-9]+$/.test(values.priceSpecial)
        ? ""
        : "Integer only";
    }

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

  const resetForm = () => {
    setValues(initialFormValues);
  };

  const handleFileChange = (e) => {
    const fileToUpload = e.target.files[0];
    setFile(fileToUpload);
  };

  const handleFileSUpload = () => {
    let formData = new FormData();

    formData.append("imageFile", file);

    axiosWithToken
      .post("/Common/UploadImage", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      const data: Product = {
        productId: values.productId,
        productName: values.productName,
        productCode: values.productCode,
        imageUrl: values.imageUrl,
        desciption: values.desciption,
        price: parseInt(values.price),
        priceRrp: parseInt(values.priceRrp),
        priceShopify: parseInt(values.priceShopify),
        priceAgent: parseInt(values.priceAgent),
        price1212: parseInt(values.price1212),
        priceSpecial: parseInt(values.priceSpecial),
        height: parseInt(values.height),
        width: parseInt(values.width),
        length: parseInt(values.length),
        weight: parseInt(values.weight),
        packageQty: parseInt(values.packageQty),
        createdAt: "",
        updatedAt: "",
      };
      if (!data.productId) {
        axiosWithToken.post("/Product/ProductCreate", data);
      } else {
        axiosWithToken.put("/Product/ProductUpdate", data);
      }
      resetForm();
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }
  };

  // Detect change of [recordForEdit]
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

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
          <TextField
            type='file'
            label='Image Upload'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            variant='outlined'
            onChange={handleFileChange}
          />
          <button className='button btn-primary' onClick={handleFileSUpload}>
            Upload Image
          </button>
        </Grid>
        <Grid item xs={3}>
          <Input
            name='length'
            label='Length (cm)'
            onChange={handleInputChange}
            value={values.length}
            error={errors["length"]}
          />
          <Input
            name='width'
            label='Width (cm)'
            onChange={handleInputChange}
            value={values.width}
            error={errors["width"]}
          />
          <Input
            name='height'
            label='Height (cm)'
            onChange={handleInputChange}
            value={values.height}
            error={errors["height"]}
          />
          <Input
            name='weight'
            label='Weight (kg)'
            onChange={handleInputChange}
            value={values.weight}
            error={errors["weight"]}
          />
          <Input
            name='packageQty'
            label='Package Quantity'
            onChange={handleInputChange}
            value={values.packageQty}
            error={errors["packageQty"]}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            name='price'
            label='Price'
            onChange={handleInputChange}
            value={values.price}
            error={errors["price"]}
          />
          <Input
            name='priceRrp'
            label='RRP Price'
            onChange={handleInputChange}
            value={values.priceRrp}
            error={errors["priceRrp"]}
          />
          <Input
            name='priceAgent'
            label='Agent Price'
            onChange={handleInputChange}
            value={values.priceAgent}
            error={errors["priceAgent"]}
          />
          <Input
            name='priceShopify'
            label='Shopify Price'
            onChange={handleInputChange}
            value={values.priceShopify}
            error={errors["priceShopify"]}
          />
          <Input
            name='price1212'
            label='12-12 Price'
            onChange={handleInputChange}
            value={values.price1212}
            error={errors["price1212"]}
          />
          <Input
            name='priceSpecial'
            label='Special Price'
            onChange={handleInputChange}
            value={values.priceSpecial}
            error={errors["priceSpecial"]}
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
