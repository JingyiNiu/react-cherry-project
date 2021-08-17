import Products from "../../components/products/products";

const ProductsPage = (props) => {
  const { axiosWithToken } = props;

  return (
    <div className='main-container'>
      <h1>Products</h1>
      <Products axiosWithToken={axiosWithToken} />
    </div>
  );
};

export default ProductsPage;
