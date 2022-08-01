import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../components/TextInput/TextInput";
import Check from "../../components/Check/Check";
import Box from "@mui/material/Box";
import { useGetCartItems } from "../../services/cart.service";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function getsteps() {
  return ["Shipping address", "Payment deatils", "Review Your order"];
}
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Checkout() {
  const { cartItems } = useGetCartItems();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getsteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(steps) {
    switch (steps) {
      case 0:
        return (
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              address1: "",
              address2: "",
              city: "",
            }}
            validationSchema={yup.object().shape({
              first_name: yup
                .string()
                .min(8, "FirstName is too short")
                .required("FirstName cannot be left blank"),
              last_name: yup
                .string()
                .min(8, "LastName is too short")
                .required("LastName cannot be left blank"),
              address1: yup
                .string()
                .min(32, "address is too short")
                .required("address cannot be left blank"),
              city: yup.string().required("City cannot be left blank"),
              zip: yup
                .string()
                .min(6, "zip is too short")
                .max(6, "zip is too long")
                .required("zip cannot be left blank"),
              country: yup.string().required("country cannot be left blank"),
            })}
          >
            <Form>
              <Typography variant="h6" gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextInput name="first_name" label="first Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput name="last_name" label="Last name" />
                </Grid>
                <Grid item xs={12}>
                  <TextInput name="address1" label="Address line 1" />
                </Grid>
                <Grid item xs={12}>
                  <TextInput name="address2" label="Address line 2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput name="city" label="City" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput name="state" label="State/Province/Region" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput name="zip" label="Zip / Postal code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput name="country" label="Country" />
                </Grid>
                <Grid item xs={12}>
                  <Check
                    name="saveAddress"
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        );
      case 1:
        return (
          <Formik
            initialValues={{
              cardName: "",
              cardNumber: "",
              expDate: "",
              cvv: "",
            }}
            validationSchema={yup.object().shape({
              cardName: yup.string().required("Card Name is required"),
              cardNumber: yup
                .string()
                .required("Card Number is required")
                .matches(
                  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                  "Please enter valid card number "
                ),
              expDate: yup
                .string()
                .required("Expiry Date of card is required")
                .matches(
                  /([0-9]{2})\/([0-9]{2})/,
                  "Not a valid expiration date. Example: MM/YY"
                ),
              cvv: yup
                .string()
                .required("Password is required")
                .min(3, "Password must be at least 3 characters")
                .matches(/^[1-9]{1}[0-9]{2}$/, "Please enter a valid cvv"),
            })}
          >
            <Form>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextInput name="cardName" label="Name on card" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput name="cardNumber" label="Card number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput name="expDate" label="Expiry date" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput
                    name="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Check
                    name="saveCard"
                    value="yes"
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>

            <List disablePadding>
              {cartItems?.map((item) => (
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={item.desciption}
                  />
                  <Typography variant="body2">{item.price}</Typography>
                </ListItem>
              ))}
              <ListItem>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1">
                  {" "}
                  {cartItems
                    .reduce((a, b) => a + b.price * b.quantity, 0)
                    .toLocaleString("en-IN")}
                </Typography>
              </ListItem>
            </List>

            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Shipping
                </Typography>
                <Typography gutterBottom>John Smith</Typography>
                <Typography gutterBottom>{addresses.join(", ")}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Payment details
                </Typography>
                <Grid container>
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
          </React.Fragment>
        );
    }
  }

  return (
    <Paper
      sx={{
        width: "500px",
        mx: "auto",
        p: 2,
      }}
    >
      <Typography component="h1" variant="h4" align="center">
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
          <Typography align="center">Thankyou For Your order</Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </Box>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" onClick={handleNext}>
              {activeStep === 2 ? "Place order" : "next"}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
