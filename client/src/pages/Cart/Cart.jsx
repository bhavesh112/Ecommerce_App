import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { useGetCartItems } from "../../services/cart.service";
import empty from "./../../assets/images/empty.jpg";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
const Cart = () => {
  const { cartItems } = useGetCartItems();

  const navigate = useNavigate();
  if (!cartItems) return null;
  if (!cartItems.length)
    return (
      <Container
        sx={{
          textAlign: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Grid container alignItems={"center"}>
          <Grid item md={6}>
            <img src={empty} alt='empty' width='100%' height='auto' />
          </Grid>
          <Grid item md={6}>
            <AddShoppingCartOutlinedIcon
              color='secondary'
              sx={{
                height: "80px",
                width: "80px",
              }}
            />
            <Typography variant='h5' fontSize='30px' my={2} align='center'>
              Your cart is empty
            </Typography>
            <Button variant='outlined' onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  return (
    <>
      <Container
        sx={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Grid
          container
          spacing={{
            xs: 1,
            sm: 2,
            md: 3,
          }}
          flexDirection={{
            xs: "column-reverse",
            sm: "row",
            md: "row",
          }}
        >
          <Grid item md={8} sm={7} xs={12}>
            <Typography variant='h4' mt={2} mb={2}>
              Items in your cart
            </Typography>
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </Stack>
          </Grid>

          <Grid item md={4} sm={5} xs={12}>
            <Typography variant='h4' mt={2} mb={2}>
              Cart Summary
            </Typography>
            <Card>
              <CardContent>
                <Typography variant='h5' mb={2} color='secondary'>
                  Total : ₹{" "}
                  {cartItems
                    .reduce((a, b) => a + b.price * b.quantity, 0)
                    .toLocaleString("en-IN")}
                </Typography>
                <Typography
                  variant='h5'
                  fontWeight={"500"}
                  fontSize='16px'
                  mb={1}
                  color=''
                >
                  Items Summary :
                </Typography>
                {cartItems.map((item) => (
                  <Typography
                    variant='caption'
                    display={"block"}
                    mb={1}
                    color='primary'
                  >
                    {item.name} x {item.quantity}
                  </Typography>
                ))}
              </CardContent>
              <Stack
                sx={{
                  p: 1,
                }}
                spacing={2}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => navigate("/")}
                  fullWidth
                >
                  Continue Shopping
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
