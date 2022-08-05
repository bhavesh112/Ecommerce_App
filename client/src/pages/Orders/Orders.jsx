import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetOrders } from "../../services/order.service";
import empty from "./../../assets/images/empty.jpg";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Orders = () => {
  const { orders } = useGetOrders();

  const navigate = useNavigate();
  if (!orders) return null;
  if (orders.length === 0)
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
              Your have not placed any orders yet
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
        <Typography variant='h5' fontSize='30px' my={2}>
          Your orders
        </Typography>
        <Stack spacing={2} mt={2}>
          {orders.map((order) => (
            <Paper
              sx={{
                p: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    fontSize={{
                      xs: "12px",
                      md: "16px",
                    }}
                    gutterBottom
                    color='secondary'
                  >
                    Order Id : {order._id}
                  </Typography>
                </Grid>
                <Grid item xs={6}></Grid>

                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    color='primary'
                    fontWeight={600}
                    fontSize={{
                      xs: "12px",
                      md: "16px",
                    }}
                  >
                    Ordered Items :
                  </Typography>
                  <List
                    dense
                    sx={{
                      p: 0,
                    }}
                  >
                    {order.cartItems.map((item) => (
                      <ListItem>
                        <ListItemText primary={item.name}></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    gutterBottom
                    color='primary'
                    fontWeight={600}
                    align='right'
                  >
                    Total : ₹ {order.totalAmount.toLocaleString("en-IN")}
                  </Typography>
                  <Typography
                    gutterBottom
                    color='primary'
                    fontWeight={600}
                    align='right'
                  >
                    Order placed on :{" "}
                    {moment(order.order_status).format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    gutterBottom
                    color='primary'
                    fontWeight={600}
                    align='right'
                  >
                    Order Status :{" "}
                    {moment().diff(moment(order.order_status), "days") > 4
                      ? "Delivered"
                      : "Pending"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Orders;
