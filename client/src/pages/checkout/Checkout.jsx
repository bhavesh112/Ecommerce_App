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

function getsteps() {
  return ["Shipping address", "Payment deatils", "Review Your order"];
}

export default function Checkout() {
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
              cardNumber: yup.string().required("Card Number is required"),
              expDate: yup.string().required("Expiry Date of card is required"),
              cvv: yup
                .string()
                .required("Password is required")
                .min(3, "Password must be at least 3 characters"),
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
          <>
            <Typography variant="h1" component="h2">
              Review Your order
            </Typography>
            ;
          </>
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
        <Typography align="center">Thankyou For Your order</Typography>
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
              {activeStep === 2 ? "finish" : "next"}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
