import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Check from "../../../components/Check/Check";
import TextInput from "../../../components/TextInput/TextInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setPayment } from "../../../modules/checkout.slice";
import moment from "moment";
const Payment = (props) => {
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.checkout);
  return (
    <Formik
      initialValues={{
        cardName: payment.cardName,
        cardNumber: payment.cardNumber,
        expDate: payment.expDate,
        cvv: payment.cvv,
      }}
      onSubmit={(values) => {
        dispatch(setPayment(values));
        props.handleNext();
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
          )
          .test("expDate", "Expiry date is invalid", function (value) {
            const date = moment(value, "MM/YY");
            return date.isValid();
          })
          .test("expDate", "Expiry date cannot be from past", function (value) {
            const date = moment(value, "MM/YY");
            return date.isAfter(moment());
          }),
        cvv: yup
          .string()
          .required("Password is required")
          .min(3, "Password must be at least 3 characters")
          .matches(/^[1-9]{1}[0-9]{2}$/, "Please enter a valid cvv"),
      })}
    >
      <Form>
        <Typography variant='h6' gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput name='cardName' label='Name on card' />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput name='cardNumber' label='Card number' />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput name='expDate' label='Expiry date' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              type='password'
              name='cvv'
              label='CVV'
              helperText='Last three digits on signature strip'
              inputProps={{
                maxLength: 3,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Check
              name='saveCard'
              value='yes'
              label='Remember credit card details for next time'
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant='contained'
            onClick={props.handleBack}
            disabled={props.activeStep === 0}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button variant='contained' type='submit'>
            Next
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default Payment;
