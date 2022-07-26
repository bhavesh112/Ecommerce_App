import {
  Button,
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
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
          p: 2,
          height: "140px",
        }}
      >
        <Grid container spacing={2} height='100%'>
          <Grid item md={2} height='100%'>
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
                    height: "110px",
                  }}
                >
                  <CardMedia
                    image={`http://localhost:8000/${picture.img}`}
                    component='img'
                    sx={{
                      maxHeight: "100%",
                    }}
                  />
                </Card>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={6}>
            <Typography variant='h5' mb={2}>
              {item.name}
            </Typography>
            <Typography variant='body1' component='label'>
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
          </Grid>
          <Grid item md={4}>
            <Typography variant='body1' mt={2} mb={1} color='secondary'>
              ₹ {item.price.toLocaleString("en-IN")} x {quantity} = ₹
              {(item.price * quantity).toLocaleString("en-IN")}
            </Typography>
            <Button
              variant='outlined'
              color='error'
              onClick={() => {
                removeFromCart(item._id);
              }}
            >
              <Delete
                sx={{
                  mr: 1,
                }}
              />{" "}
              Remove from cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CartItem;
