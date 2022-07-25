import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useGetProductsByKeyword } from "../../services/product.service";

const ProductPage = () => {
  const { products, isProductsLoading } = useGetProductsByKeyword();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("q");
  if (isProductsLoading) return <div>Loading...</div>;
  if (!products.length)
    return (
      <Container>
        {" "}
        <Typography variant='h5' my={2}>
          No products found for "{keyword}"
        </Typography>
      </Container>
    );
  return (
    <>
      <Container>
        <Typography variant='h5' my={2}>
          Showing results for {keyword}
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductCard product={product}></ProductCard>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductPage;
