import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "../../services/admin.service";
import { useGetUser } from "../../services/auth.service";
import { useAddToCart } from "../../services/cart.service";

const ProductCard = ({ product }) => {
  const { isAdmin, isAuthenticated } = useGetUser();
  const { deleteProduct } = useDeleteProductMutation();
  const navigate = useNavigate();
  const { addToCart } = useAddToCart();
  if (!product) return null;
  return (
    <>
      <Grid item md={3} sm={6} xs={12}>
        <Card
          //   sx={{
          //     "&:hover": {
          //       "& .add-to-cart": {
          //         transform: "translateY(0)",
          //       },
          //     },
          //   }}
          onClick={() => {
            navigate(`/product/${product._id}`);
          }}
          sx={{
            position: "relative",
            cursor: "pointer",
            height: "100%",
            "&:hover": {
              boxShadow: 5,
            },
          }}
        >
          {isAdmin && (
            <IconButton
              title='Delete'
              color='error'
              sx={{
                position: "absolute",
                background: "white",
                right: "10px",
                top: "10px",
              }}
              onClick={(e) => {
                deleteProduct(product._id);
                e.stopPropagation();
              }}
            >
              <Delete />
            </IconButton>
          )}
          <Box
            width='100%'
            sx={{
              border: "3px solid ",
              borderColor: "secondary.main",
            }}
          >
            <CardMedia
              image={`http://localhost:3003/${product.productPicture[0].img}`}
              component='img'
              height='160'
              sx={{
                width: "auto",
                mx: "auto",
                maxWidth: "100%",
              }}
            />
          </Box>
          <CardContent>
            <Typography
              variant='h5'
              fontSize='20px'
              align='center'
              fontWeight={"600"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant='body2'
              fontSize='14px'
              align='center'
              mb={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.description}
            </Typography>
            <Typography
              variant='body1'
              color='secondary'
              fontSize={"18px"}
              align='center'
            >
              ₹ {product?.price?.toLocaleString("en-IN")}
            </Typography>
          </CardContent>
          <CardActionArea
          // className='add-to-cart'
          // sx={{
          //   borderRadius: "0px",
          //   transform: "translateY(calc(100% + 2px))",
          //   transition: "transform 0.3s ease-in-out",
          // }}
          >
            <CardActions
              sx={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                fullWidth
                color='secondary'
                variant='contained'
                onClick={(e) => {
                  if (!isAuthenticated) {
                    toast.error("Please login to add to cart");
                  }
                  addToCart({
                    productId: product._id,
                    quantity: 1,
                    name: product.name,
                    price: product.price,
                    productPicture: product.productPicture,
                  });
                  e.stopPropagation();
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
