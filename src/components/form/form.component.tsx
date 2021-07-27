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

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Form Component</h2>
      <Grid container>
        {/* First Column */}
        <Grid item xs={6}>
          {/* Product Name */}
          <div className='input-group'>
            <input
              className='input'
              {...register("productName", {
                required: true,
              })}
            />
            <div className={`${watch("productName") ? "shrink" : ""} label`}>
              Product Name <span className='required'>*</span>
            </div>
          </div>
          {errors?.productName?.type === "required" && (
            <p className='message'>This field is required</p>
          )}

          {/* Product Code */}
          <div className='input-group'>
            <input className='input' {...register("productCode")} />
            <div className={`${watch("productCode") ? "shrink" : ""} label`}>
              Product Code
            </div>
          </div>

          {/* Description */}
          <div className='input-group'>
            <input className='input' {...register("description")} />
            <div className={`${watch("description") ? "shrink" : ""} label`}>
              Description
            </div>
          </div>

          {/* Image URL */}
          <div className='input-group'>
            <input className='input' {...register("imageUrl")} />
            <div className={`${watch("imageUrl") ? "shrink" : ""} label`}>
              Image URL
            </div>
          </div>
        </Grid>

        {/* Second Column */}
        <Grid item xs={3}>
          {/* Length (cm) */}
          <div className='input-group'>
            <input
              className='input'
              {...register("length", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("length") ? "shrink" : ""} label`}>
              Length (cm)
            </div>
          </div>
          {errors?.length?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Width (cm) */}
          <div className='input-group'>
            <input
              className='input'
              {...register("width", {
                pattern: /^[0-9]/,
              })}
            />
            <div className={`${watch("width") ? "shrink" : ""} label`}>
              Width (cm)
            </div>
          </div>
          {errors?.width?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Height (cm) */}
          <div className='input-group'>
            <input
              className='input'
              {...register("height", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("height") ? "shrink" : ""} label`}>
              Height (cm)
            </div>
          </div>
          {errors?.height?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Weight (kg) */}
          <div className='input-group'>
            <input
              className='input'
              {...register("weight", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("weight") ? "shrink" : ""} label`}>
              Weight (kg)
            </div>
          </div>
          {errors?.weight?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Package Quantity */}
          <div className='input-group'>
            <input
              className='input'
              {...register("packageQty", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("packageQty") ? "shrink" : ""} label`}>
              Package Quantity
            </div>
          </div>
          {errors?.packageQty?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}
        </Grid>

        {/* Third Column */}
        <Grid item xs={3}>
          {/* Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("price", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("price") ? "shrink" : ""} label`}>
              Price
            </div>
          </div>
          {errors?.price?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* RRP Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("priceRrp", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("priceRrp") ? "shrink" : ""} label`}>
              RRP Price
            </div>
          </div>
          {errors?.priceRrp?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Agent Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("priceAgent", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("priceAgent") ? "shrink" : ""} label`}>
              Agent Price
            </div>
          </div>
          {errors?.priceAgent?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Shopify Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("priceShopify", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("priceShopify") ? "shrink" : ""} label`}>
              Shopify Price
            </div>
          </div>
          {errors?.priceShopify?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* 12-12 Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("price1212", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("price1212") ? "shrink" : ""} label`}>
              12-12 Price
            </div>
          </div>
          {errors?.price1212?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}

          {/* Special Price */}
          <div className='input-group'>
            <input
              className='input'
              {...register("priceSpecial", {
                pattern: /^[0-9]+$/,
              })}
            />
            <div className={`${watch("priceSpecial") ? "shrink" : ""} label`}>
              Special Price
            </div>
          </div>
          {errors?.priceSpecial?.type === "pattern" && (
            <p className='message'>Numbers only</p>
          )}
        </Grid>

        {/* Buttons */}
        <div className='button-group products-btn-group'>
          <button className='button btn-primary' type='submit'>
            Submit
          </button>
          <button className='button btn-gray' type='reset'>
            Reset
          </button>
        </div>
      </Grid>
    </form>
  );
};

export default Form;
