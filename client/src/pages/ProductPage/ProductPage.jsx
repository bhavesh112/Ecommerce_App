import { Box, Chip, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPriceRange } from "../../modules/products.slice";
import Delete from "@mui/icons-material/Delete";
import empty from "./../../assets/images/empty.jpg";
import { useAddToCart } from "../../services/cart.service";
const ProductPage = ({ products, keyword, productsByPrice }) => {
  const dispatch = useDispatch();
  const { selected_price_range } = useSelector((state) => state.product);

  const productsToMap = selected_price_range
    ? productsByPrice[selected_price_range]
    : products;
  if (!products?.length)
    return (
      <Container
        sx={{
          minHeight: "calc(100vh - 64px)",
          textAlign: "center",
        }}
      >
        {" "}
        <Typography variant='h5' mt={2} align='center'>
          {keyword ? `No products found for "${keyword}"` : "No products found"}
        </Typography>
        <img src={empty} alt='No Products' width='50%' height='auto' />{" "}
      </Container>
    );
  if (!productsToMap.length) {
    return (
      <Container
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Filters />{" "}
        <Typography variant='h5' my={2}>
          No products found for this price range
        </Typography>
      </Container>
    );
  }
  return (
    <>
      <Container
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Filters />
        <Typography variant='h5' my={2}>
          {keyword
            ? `Showing Results for ${keyword}`
            : `Showing ${products[0].category.name} `}
        </Typography>
        <Grid container spacing={3}>
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
      <Typography variant='body1' whiteSpace={"nowrap"}>
        Price Filters :
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          py: "12px",
        }}
      >
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
    </Box>
  );
};
export default ProductPage;
