import React from "react";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";

import "./form.style.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Form Component</h2>
      <Grid container>
        {/* First Column */}
        <Grid item xs={6}>
          {/* Product Name */}
          <div className='label'>
            Product Name <span className='required'>*</span>
          </div>
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
          <div className='input-group'>
            <div className='label'>Product Code</div>
            <input
              className='input'
              placeholder='Product Code'
              {...register("productCode")}
            />
          </div>

          {/* Description */}
          <div className='label'>Description</div>
          <input
            className='input'
            placeholder='Description'
            {...register("description")}
          />

          {/* Image URL */}
          <div className='label'>Image URL</div>
          <input
            className='input'
            placeholder='Image URL'
            {...register("imageUrl")}
          />
        </Grid>

        {/* Second Column */}
        <Grid item xs={3}>
          {/* Length (cm) */}
          <div className='label'>Length (cm)</div>
          <input
            className='input'
            placeholder='Length'
            {...register("length", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.length?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Width (cm) */}
          <div className='label'>Width (cm)</div>
          <input
            className='input'
            placeholder='Width'
            {...register("width", {
              pattern: /^[0-9]/,
            })}
          />
          {errors?.width?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Height (cm) */}
          <div className='label'>Height (cm)</div>
          <input
            className='input'
            placeholder='Height'
            {...register("height", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.height?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}
          {/* Weight (kg) */}
          <div className='label'>Weight (kg)</div>
          <input
            className='input'
            placeholder='Weight'
            {...register("weight", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.weight?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Package Quantity */}
          <div className='label'>Package Quantity</div>
          <input
            className='input'
            placeholder='Package Quantity'
            {...register("packageQty", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.packageQty?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}
        </Grid>

        {/* Third Column */}
        <Grid item xs={3}>
          {/* Price */}
          <div className='label'>Price</div>
          <input
            className='input'
            placeholder='Price'
            {...register("price", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.price?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* RRP Price */}
          <div className='label'>RRP Price</div>
          <input
            className='input'
            placeholder='RRP Price'
            {...register("priceRrp", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.priceRrp?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Agent Price */}
          <div className='label'>Agent Price</div>
          <input
            className='input'
            placeholder='Agent Price'
            {...register("priceAgent", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.priceAgent?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Shopify Price */}
          <div className='label'>Shopify Price</div>
          <input
            className='input'
            placeholder='Shopify Price'
            {...register("priceShopify", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.priceShopify?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* 12-12 Price */}
          <div className='label'>12-12 Price</div>
          <input
            className='input'
            placeholder='12-12 Price'
            {...register("price1212", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.price1212?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Special Price */}
          <div className='label'>Special Price</div>
          <input
            className='input'
            placeholder='Special Price'
            {...register("priceSpecial", {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors?.priceSpecial?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}
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
