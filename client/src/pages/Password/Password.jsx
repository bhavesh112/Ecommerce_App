import { Form, Formik } from "formik";
import CommonAuthWrapper from "../../components/CommonAuthWrapper/CommonAuthWrapper";
import * as yup from "yup";
import { useEffect } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { Button } from "@mui/material";
import {
  useChangePassword,
  useForgotPassword,
  useGetUser,
  useResetPassword,
} from "../../services/auth.service";
import { useParams } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

const Password = ({ type }) => {
  const { isLoading } = useGetUser();
  if (isLoading) return <FullScreenLoader />;
  if (type === "forgot") {
    return (
      <>
        <ForgotPassword />
      </>
    );
  }

  if (type === "reset") {
    return (
      <>
        <ResetPassword />
      </>
    );
  }
  if (type === "change") {
    return (
      <>
        <ChangePassword />
      </>
    );
  }
};
const ForgotPassword = () => {
  const { forgotPassword, isSendingMail } = useForgotPassword();
  return (
    <>
      <CommonAuthWrapper>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Please enter a valid email")
              .required("Email is required"),
          })}
          onSubmit={(values) => {
            forgotPassword({
              email: values.email,
            });
          }}
        >
          <Form>
            <TextInput name='email' label='Email' />
            <Button type='submit' variant='contained' size='large' fullWidth>
              {isSendingMail ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
        </Formik>
      </CommonAuthWrapper>
    </>
  );
};

const ResetPassword = () => {
  const { resetPassword, isResettingPassword } = useResetPassword();
  const { token } = useParams();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.setItem("reset-token", token);
  }, []);
  return (
    <>
      <CommonAuthWrapper>
        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
          }}
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters"),
            confirm_password: yup
              .string()
              .oneOf([yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values) => {
            resetPassword({
              password: values.password,
            });
          }}
        >
          <Form>
            <TextInput name='password' type='password' label='Password' />
            <TextInput
              name='confirm_password'
              type='password'
              label='Confirm Password'
            />
            <Button type='submit' variant='contained' size='large' fullWidth>
              Reset Password
            </Button>
          </Form>
        </Formik>
      </CommonAuthWrapper>
    </>
  );
};

const ChangePassword = () => {
  const { changePassword } = useChangePassword();
  return (
    <>
      <CommonAuthWrapper>
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={yup.object().shape({
            oldPassword: yup.string().required("Password is required"),
            password: yup
              .string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters"),
            confirm_password: yup
              .string()
              .oneOf([yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values) => {
            changePassword({
              oldPassword: values.oldPassword,
              newPassword: values.password,
            });
          }}
        >
          <Form>
            <TextInput
              name='oldPassword'
              type='password'
              label='Old Password'
            />
            <TextInput name='password' type='password' label='Password' />
            <TextInput
              name='confirm_password'
              type='password'
              label='Confirm Password'
            />
            <Button type='submit' variant='contained' size='large' fullWidth>
              Change Password
            </Button>
          </Form>
        </Formik>
      </CommonAuthWrapper>
    </>
  );
};
export default Password;
