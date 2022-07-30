import { Button, CircularProgress, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import TextInput from "../../components/TextInput/TextInput";
import CommonAuthWrapper from "../../components/CommonAuthWrapper/CommonAuthWrapper";
import { useRegisterUser } from "../../services/auth.service";
import Check from "../../components/Check/Check";
import * as yup from "yup";
const Register = () => {
  const { register, isRegistering } = useRegisterUser();
  return (
    <CommonAuthWrapper>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          register({
            name: values.first_name + " " + values.last_name,
            email: values.email,
            password: values.password,
            role: values.isSeller ? "admin" : "user",
          });
        }}
        validationSchema={yup.object().shape({
          first_name: yup.string().required("First name is required"),
          last_name: yup.string().required("Last name is required"),
          email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
          password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
          confirm_password: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        })}
      >
        <Form>
          <Grid container columnSpacing={2}>
            <Grid item md={6} xs={12} sm={6}>
              <TextInput name='first_name' label='First Name' />
            </Grid>
            <Grid item md={6} xs={12} sm={6}>
              <TextInput name='last_name' label='Last Name' />
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
              <TextInput name='email' label='Email' />
            </Grid>
            <Grid item md={6} xs={12} sm={6}>
              <TextInput name='password' type='password' label='Password' />
            </Grid>
            <Grid item md={6} xs={12} sm={6}>
              <TextInput
                name='confirm_password'
                type='password'
                label='Confirm Password'
              />
            </Grid>
            {/* <Grid item md={12}>
              <Check label='Register as Seller' name='isSeller' />
            </Grid> */}
            <Grid item md={12} xs={12} sm={12}>
              <Button type='submit' variant='contained' size='large' fullWidth>
                {isRegistering ? <CircularProgress /> : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </CommonAuthWrapper>
  );
};

export default Register;
