import { useLocation } from "react-router-dom";
import { useGetProductsByKeyword } from "../../services/product.service";

import ProductPage from "./ProductPage";

const ProductSearch = () => {
  const { products, isProductsLoading, productsByPrice } =
    useGetProductsByKeyword();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("q");
  if (isProductsLoading) return <div>Loading...</div>;

  return (
    <ProductPage
      products={products}
      productsByPrice={productsByPrice}
      keyword={keyword}
    />
  );
};

export default ProductSearch;
