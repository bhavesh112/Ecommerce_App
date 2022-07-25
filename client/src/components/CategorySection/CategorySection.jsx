import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { useGetProductsByCategory } from "../../services/product.service";
import ProductCard from "../ProductCard/ProductCard";
import _ from "lodash";
const CategorySection = ({ category }) => {
  return (
    <>
      <Container>
        <Box display='flex' justifyContent={"space-between"}>
          <Typography variant='h4' mt={2} gutterBottom>
            {category.name}
          </Typography>
          <Button variant='text'>See all</Button>
        </Box>
        <Grid container spacing={2}>
          <ProductSection category_id={category._id} />
        </Grid>
      </Container>
    </>
  );
};
const ProductSection = ({ category_id }) => {
  const { products } = useGetProductsByCategory(category_id);
  if (!products || !products.length) return null;
  return (
    <>
      {_.chunk(products, 4)[0].map((product) => (
        <>
          <ProductCard key={product._id} product={product} />
        </>
      ))}
    </>
  );
};
export default CategorySection;
