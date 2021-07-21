import ProductsTable from "../../components/products-table/products-table.component";

import "./products.style.css";

const Products = () => {
  return (
    <div className='main-container'>
      <h1>Product Page</h1>
      <ProductsTable />
    </div>
  );
};

export default Products;
