import {
  Button,
  Card,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Delete from "@mui/icons-material/Delete";
import { useRemoveFromCart, useUpdateCart } from "../../services/cart.service";
import _ from "lodash";
import { useEffect } from "react";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateCart } = useUpdateCart();
  const { removeFromCart } = useRemoveFromCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const updateCartFn = useCallback(
    _.debounce((data) => {
      updateCart(data);
    }, 500),
    [updateCart]
  );
  useEffect(() => {
    if (item.quantity !== quantity) {
      updateCartFn({
        _id: item._id,
        quantity,
      });
    }
  }, [quantity]);
  return (
    <>
      <Paper
        sx={{
          p: {
            xs: 1,
            sm: 2,
            md: 2,
          },
          minHeight: "170px",
        }}
      >
        <Grid container spacing={2} height='100%'>
          <Grid item md={4} sm={4} xs={4} height='100%'>
            <Carousel
              navButtonsAlwaysInvisible
              indicators={false}
              stopAutoPlayOnHover
              duration={"2000"}
            >
              {item.productPicture.map((picture) => (
                <Card
                  sx={{
                    boxShadow: "none",
                    minHeight: "140px",
                  }}
                >
                  <CardMedia
                    image={`http://localhost:3003/${picture.img}`}
                    component='img'
                    sx={{
                      maxHeight: "100%",
                      width: "auto",
                      height: "140px",
                      mx: "auto",
                    }}
                  />
                </Card>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography
              variant='h5'
              mb={1}
              fontSize={{
                xs: "16px",
                sm: "16px",
                md: "22px",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              variant='body1'
              color='secondary'
              mb={1}
              fontSize={{
                xs: "14px",
                sm: "14px",
                md: "18px",
              }}
              sx={{
                "& > span.price ": {
                  color: "#111 !important",
                },
              }}
              fontWeight={"500"}
            >
              <span className='price'>Price :</span> ₹{" "}
              {item.price * item.quantity}
            </Typography>

            <Typography
              variant='body1'
              component='label'
              fontSize={{
                xs: "14px",
                md: "16px",
                sm: "14px",
              }}
              display={"inline-block"}
            >
              Quantity :{" "}
              <input
                type='number'
                value={quantity}
                style={{
                  height: "30px",
                  width: "50px",
                }}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                min={1}
              />
            </Typography>
            <IconButton
              onClick={() => removeFromCart(item._id)}
              sx={{
                ml: 2,
              }}
              color='error'
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CartItem;
