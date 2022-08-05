import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUser } from "../../services/auth.service";
import { useAddToCart } from "../../services/cart.service";
import { useGetProductById } from "../../services/product.service";

const SingleProduct = () => {
  const { product_id } = useParams();
  const { addToCart } = useAddToCart();
  const { isAuthenticated } = useGetUser();
  const [quantity, setQuantity] = useState(1);
  const { product, isProductLoading } = useGetProductById(product_id);
  if (isProductLoading) return null;
  return (
    <>
      <Container
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Grid container spacing={3} py={3}>
          <Grid item md={4} xs={12}>
            <Carousel
              animation='fade'
              swipe
              indicators={false}
              navButtonsAlwaysVisible
              timeout={3000}
            >
              {product?.productPicture?.map((item) => (
                <>
                  <Box p={3}>
                    <Card
                      sx={{
                        height: "400px",
                      }}
                    >
                      <CardMedia
                        image={`http://localhost:3003/${item.img}`}
                        component='img'
                        height={"400"}
                        sx={{
                          mx: "auto",
                          maxWidth: "100%",
                          width: "auto",
                        }}
                      />
                    </Card>
                  </Box>
                </>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={8}>
            <Typography variant='h2' fontSize={"30px"} gutterBottom mt={3}>
              {product?.name}
            </Typography>
            <Divider />
            <Typography
              variant='h4'
              fontSize={"18px"}
              whiteSpace={"pre-line"}
              mt={2}
            >
              Category : {product?.category.name}
            </Typography>
            <Typography variant='body2' whiteSpace={"pre-line"} mt={2}>
              {product?.description}
            </Typography>
            <Box display='flex' mt={2} alignItems='center' mb={3}>
              <Typography variant='body1' fontSize={"20px"}>
                Price :&nbsp;
              </Typography>
              <Typography
                variant='h4'
                fontWeight={"500"}
                fontSize={"24px"}
                color='secondary'
              >
                ₹ {product?.price.toLocaleString("en-IN")}
              </Typography>
            </Box>
            <Box display={"flex"} gap='30px'>
              <input
                type='number'
                style={{
                  width: "50px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  textAlign: "center",
                  height: "40px",
                }}
                min='1'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                color='secondary'
                variant='contained'
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error("Please login to add to cart");
                  }
                  addToCart({
                    productId: product._id,
                    quantity: Number(quantity),
                    name: product.name,
                    price: product.price,
                    productPicture: product.productPicture,
                  });
                }}
              >
                {" "}
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SingleProduct;
