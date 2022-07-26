import { useLocation } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
import { useGetProductsByKeyword } from "../../services/product.service";

import ProductPage from "./ProductPage";

const ProductSearch = () => {
  const { products, isProductsLoading, productsByPrice } =
    useGetProductsByKeyword();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("q");
  if (isProductsLoading) return <FullScreenLoader />;

  return (
    <ProductPage
      products={products}
      productsByPrice={productsByPrice}
      keyword={keyword}
    />
  );
};

export default ProductSearch;
