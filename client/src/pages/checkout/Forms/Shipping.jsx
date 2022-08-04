import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Check from "../../../components/Check/Check";
import TextInput from "../../../components/TextInput/TextInput";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setShipping } from "../../../modules/checkout.slice";
const Shipping = (props) => {
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.checkout);
  return (
    <>
      <Formik
        initialValues={{
          first_name: shipping.first_name,
          last_name: shipping.last_name,
          address1: shipping.address1,
          address2: shipping.address2,
          city: shipping.city,
          country: shipping.country,
          zip: shipping.zip,
          state: shipping.state,
        }}
        onSubmit={(values) => {
          dispatch(setShipping(values));
          props.handleNext();
        }}
        validationSchema={yup.object().shape({
          first_name: yup
            .string()
            .min(3, "FirstName is too short")
            .required("FirstName cannot be left blank"),
          last_name: yup
            .string()
            .min(3, "LastName is too short")
            .required("LastName cannot be left blank"),
          address1: yup
            .string()
            .min(3, "address is too short")
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
          <Typography variant='h6' gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextInput name='first_name' label='First name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput name='last_name' label='Last name' />
            </Grid>
            <Grid item xs={12}>
              <TextInput name='address1' label='Address line 1' />
            </Grid>
            <Grid item xs={12}>
              <TextInput name='address2' label='Address line 2' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput name='city' label='City' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput name='state' label='State/Province/Region' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                name='zip'
                label='Zip / Postal code'
                inputProps={{
                  maxLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput name='country' label='Country' />
            </Grid>
            <Grid item xs={12}>
              <Check
                name='saveAddress'
                label='Use this address for payment details'
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
    </>
  );
};

export default Shipping;
