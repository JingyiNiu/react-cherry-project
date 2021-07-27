import React from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";

import "./form.style.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(watch("example"));

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Form Component</h2>
      <Grid container>
        {/* first column */}
        <Grid item xs={6}>
          {/* Product Name */}
          <div className='label'>Product Name</div>
          <input
            className='input'
            placeholder='Product Name'
            {...register("productName", {
              required: true,
            })}
          />
          {errors?.productName?.type === "required" && (
            <p className='message'>This field is required</p>
          )}

          {/* Product Code */}
          <div className='label'>Product Code</div>
          <input className='input' placeholder='Product Code' />

          {/* Description */}
          <div className='label'>Description</div>
          <input className='input' placeholder='Description' />

          {/* Image URL */}
          <div className='label'>Image URL</div>
          <input className='input' placeholder='Image URL' />
        </Grid>
        <Grid item xs={3}>
          {/* Length (cm) */}
          <div className='label'>Length (cm)</div>
          <input className='input' placeholder='Length' />

          {/* Width (cm) */}
          <div className='label'>Width (cm)</div>
          <input className='input' placeholder='Width' />

          {/* Height (cm) */}
          <div className='label'>Height (cm)</div>
          <input className='input' placeholder='Height' />

          {/* Weight (kg) */}
          <div className='label'>Weight (kg)</div>
          <input className='input' placeholder='Weight' />

          {/* Package Quantity */}
          <div className='label'>Package Quantity</div>
          <input className='input' placeholder='Package Quantity' />
        </Grid>
        <Grid item xs={3}>
          {/* Price */}
          <div className='label'>Price</div>
          <input className='input' placeholder='Price' />

          {/* RRP Price */}
          <div className='label'>RRP Price</div>
          <input className='input' placeholder='RRP Price' />

          {/* Agent Price */}
          <div className='label'>Agent Price</div>
          <input className='input' placeholder='Agent Price' />

          {/* Shopify Price */}
          <div className='label'>Shopify Price</div>
          <input className='input' placeholder='Shopify Price' />

          {/* 12-12 Price */}
          <div className='label'>12-12 Price</div>
          <input className='input' placeholder='12-12 Price' />

          {/* Special Price */}
          <div className='label'>Special Price</div>
          <input className='input' placeholder='Special Price' />
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

export default Form;
