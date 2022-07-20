import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import CommonAuthWrapper from "../../components/CommonAuthWrapper/CommonAuthWrapper";
import TextInput from "../../components/TextInput/TextInput";
import * as yup from "yup";
import { useLoginUser } from "../../services/auth.service";
const Login = () => {
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
