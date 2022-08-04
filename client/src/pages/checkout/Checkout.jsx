import React, { useMemo, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import { useGetCartItems } from "../../services/cart.service";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Shipping from "./Forms/Shipping";
import Payment from "./Forms/Payment";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import { useCreateOrderMutation } from "../../services/order.service";

function getsteps() {
  return ["Shipping address", "Payment deatils", "Review Your order"];
}

export default function Checkout() {
  const { cartItems } = useGetCartItems();

  const [activeStep, setActiveStep] = useState(0);

  const { payment, shipping } = useSelector((state) => state.checkout);
  const steps = getsteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const { createOrder, order_id } = useCreateOrderMutation(handleNext);
  const handlePlaceOrder = () => {
    createOrder({
      totalAmount: cartItems.reduce((a, b) => a + b.price * b.quantity, 0),
      shipping,
      cartItems,
    });
  };
  const payments = useMemo(
    () => [
      { name: "Card holder", detail: payment.cardName },
      { name: "Card number", detail: payment.cardNumber },
      { name: "Expiry date", detail: payment.expDate },
    ],
    [payment.cardName, payment.cardNumber, payment.expDate]
  );
  function getStepContent(steps) {
    switch (steps) {
      case 0:
        return (
          <Shipping
            handleNext={handleNext}
            activeStep={activeStep}
            handleBack={handleBack}
          />
        );
      case 1:
        return (
          <Payment
            handleNext={handleNext}
            activeStep={activeStep}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant='h6' gutterBottom color='primary'>
              Order summary
            </Typography>

            <List disablePadding>
              {cartItems?.map((item) => (
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={item.desciption}
                  />
                  <Typography variant='body2'>{item.price}</Typography>
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary='Total' />
                <Typography
                  variant='subtitle1'
                  color='secondary'
                  fontSize='18px'
                  fontWeight='500'
                >
                  {" "}
                  {cartItems
                    .reduce((a, b) => a + b.price * b.quantity, 0)
                    .toLocaleString("en-IN")}
                </Typography>
              </ListItem>
            </List>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Shipping
                </Typography>
                <Typography gutterBottom>
                  {shipping?.first_name + " " + shipping?.last_name}
                </Typography>
                <Typography gutterBottom>
                  {shipping?.address1 + " " + shipping?.address2}
                </Typography>
                <Typography gutterBottom>
                  {shipping?.city + "," + shipping?.state + " " + shipping?.zip}
                </Typography>
              </Grid>
              <Grid item container direction='column' xs={12} sm={6}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Payment details
                </Typography>
                <Grid container spacing={2}>
                  {payments.map((payment) => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                px: {
                  xs: "0px",
                  sm: "0px",
                  md: 4,
                },
                pt: 2,
              }}
            >
              <Button
                variant='contained'
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant='contained'
                color='primary'
                onClick={handlePlaceOrder}
              >
                Place order
              </Button>
            </Box>
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Paper
        sx={{
          width: {
            sm: "100%",
            xs: "100%",
            md: "700px",
          },

          mx: "auto",
          p: 2,
          mt: 2,
        }}
      >
        <Typography component='h1' variant='h4' align='center'>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 3 ? (
          <Box mt={4}>
            <Typography variant='h5' gutterBottom align='center'>
              Thankyou For Your order
            </Typography>
            <Typography variant='subtitle1'>
              Your order id is {order_id}. The order will be delivered soon.
            </Typography>
          </Box>
        ) : (
          <>{getStepContent(activeStep)}</>
        )}
      </Paper>
    </Container>
  );
}
