import { Box, Chip, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPriceRange } from "../../modules/products.slice";
import Delete from "@mui/icons-material/Delete";
const ProductPage = ({ products, keyword, productsByPrice }) => {
  const dispatch = useDispatch();
  const { selected_price_range } = useSelector((state) => state.product);

  const productsToMap = selected_price_range
    ? productsByPrice[selected_price_range]
    : products;
  if (!products?.length)
    return (
      <Container>
        {" "}
        <Typography variant='h5' my={2}>
          {keyword ? `No products found for ${keyword}` : "No products found"}
        </Typography>
      </Container>
    );
  if (!productsToMap.length) {
    return (
      <Container>
        <Filters />{" "}
        <Typography variant='h5' my={2}>
          No products found for this price range
        </Typography>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Filters />
        <Typography variant='h5' my={2}>
          {keyword
            ? `Showing Results for ${keyword}`
            : `Showing ${products[0].category.name} `}
        </Typography>
        <Grid container spacing={2}>
          {productsToMap.map((product) => (
            <ProductCard product={product}></ProductCard>
          ))}
        </Grid>
      </Container>
    </>
  );
};
const Filters = () => {
  const dispatch = useDispatch();
  const { selected_price_range, priceRange } = useSelector(
    (state) => state.product
  );

  return (
    <Box display={"flex"} gap='20px' mt={2} alignItems='center'>
      <Typography variant='body1'>Price Filters :</Typography>
      {Object.keys(priceRange).map((price) => (
        <>
          <Chip
            onClick={() => {
              dispatch(setSelectedPriceRange(priceRange[price]));
            }}
            variant={
              selected_price_range === priceRange[price]
                ? "default"
                : "outlined"
            }
            color='primary'
            label={price}
          />
        </>
      ))}
      {selected_price_range && (
        <Chip
          onClick={() => {
            dispatch(setSelectedPriceRange(""));
          }}
          variant={selected_price_range ? "outlined" : "disabled"}
          color='primary'
          label={"Clear"}
          icon={<Delete />}
        />
      )}
    </Box>
  );
};
export default ProductPage;
