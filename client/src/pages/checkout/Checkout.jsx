import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
          <>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="billing address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                      />
                    }
                    label="Use this address for payment details"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </>
        );
      case 1:
        return (
          <>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expDate"
                    label="Expiry date"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="saveCard" value="yes" />
                    }
                    label="Remember credit card details for next time"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </>
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

          <Button
            variant="contained"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === 2 ? "finish" : "next"}
          </Button>
        </>
      )}
    </Paper>
  );
}

// <Typography variant="h3" component="h2" align="center" mt={4}>
// Checkout
// </Typography>
// <Formik>
// <Form>
// <Grid>
// <Typography variant="h5" component="h2" mb={2}>
// Shipping address
// </Typography>
// </Grid>
// <Grid container columnSpacing={2}>
// <Grid item md={4}>
// <TextInput name='firstname' label='First Name' variant='standard' />
// </Grid>
// <Grid item md={4}>
// <TextInput name='lastname'  label='Last Name' variant='standard' />
// </Grid>
// <Grid item md={8}>
// <TextInput name='address1' label='Address line 1 *' variant='standard' />
// </Grid>
// <Grid item md={8}>
// <TextInput name='address2'  label='Address line 2'  variant='standard'/>
// </Grid>
// <Grid item md={4}>
// <TextInput  name='city' label='city'  variant='standard'/>
// </Grid>
// <Grid item md={2}>
// <Button type='submit' variant='contained' size='large' fullWidth>
// </Button>
// </Grid>
// </Grid>
// </Form>
// </Formik>
