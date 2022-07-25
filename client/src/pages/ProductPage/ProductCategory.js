import { useParams } from "react-router-dom";
import { useGetProductsByCategory } from "../../services/product.service";

import ProductPage from "./ProductPage";

const ProductCategory = (Component) => {
  const { category_id } = useParams();
  const { products, priceRange, productsByPrice, isProductsLoading } =
    useGetProductsByCategory(category_id);
  if (isProductsLoading) return <div>Loading...</div>;
  return (
    <>
      <ProductPage
        products={products}
        priceRange={priceRange}
        productsByPrice={productsByPrice}
      />
    </>
  );
};

export default ProductCategory;
