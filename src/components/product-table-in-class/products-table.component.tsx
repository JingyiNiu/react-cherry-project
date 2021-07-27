import axios from "axios";
import React, { Component } from "react";
import { Product } from "../../Product";

export class ProductsTable extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios
      .get("http://206.189.39.185:5031/api/Product")
      .then((response) => {
        this.setState({ products: response.data.data });
        console.log(this.state.products);
      })
      .catch((error) => console.log(error));
  }

  // async componentDidMount() {
  //   const getAPI = axios.get("http://206.189.39.185:5031/api/Product");
  //   const data = (await getAPI).data.data;
  //   this.setState({ products: data });
  //   console.log(this.state.products);
  // }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        <h2>ProductsTable</h2>
        {products.map((product) => (
          <p>{product["productName"]}</p>
          // <p>{product.productName}</p>
        ))}
      </div>
    );
  }
}

export default ProductsTable;
