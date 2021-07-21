import axios from "axios";
import React, { Component } from "react";

export class ProductsTable extends Component<{}, { products: [] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://206.189.39.185:5031/api/Product")
      .then((response) => {
        this.setState({ products: response.data.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h2>ProductsTable</h2>
        {products.map((product) => (
          <p></p>
        ))}
      </div>
    );
  }
}

export default ProductsTable;
