import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import CommonAuthWrapper from "../../components/CommonAuthWrapper/CommonAuthWrapper";
import TextInput from "../../components/TextInput/TextInput";
import * as yup from "yup";
import { useLoginUser } from "../../services/auth.service";
import { Link } from "react-router-dom";
const Login = ({ mode }) => {
  const { login, isLoggingIn } = useLoginUser();
  return (
    <CommonAuthWrapper>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          login(values);
        }}
        validationSchema={yup.object().shape({
          email: yup.string().required("Email is required"),
          password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        })}
      >
        <Form>
          <TextInput name='email' label='Email' />
          <TextInput name='password' type='password' label='Password' />
          <Box display={"flex"} justifyContent='flex-end' mb={2} mt={-1}>
            <Link to='/forgot-password'>Forgot Password ?</Link>
          </Box>
          <Button
            type='submit'
            variant='contained'
            size='large'
            fullWidth
            disabled={isLoggingIn}
          >
            Login
          </Button>
        </Form>
      </Formik>
    </CommonAuthWrapper>
  );
};

export default Login;
