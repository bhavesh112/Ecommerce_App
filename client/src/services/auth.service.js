import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.post("/users/signup", req);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully registered");
        navigate("/");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          toastId: "register-error",
        });
      },
    }
  );

  return { register: mutate, isRegistering: isLoading };
};

export const useGetUser = () => {
  const { data, isLoading, isError } = useQuery(["user"], async () => {
    return api.get("/users/signin");
  });
  if (isError) {
    return {
      isAuthenticated: false,
      user: null,
      isLoading,
    };
  }
  return {
    user: data?.data,
    isLoading,
    isAuthenticated: data?.status === 200,
    isAdmin: data?.data?.role === "admin",
  };
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.post("/users/signin", req);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully logged in");
        navigate("/");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        toast.error(err.response.data.msg, {
          toastId: "login-error",
        });
      },
    }
  );

  return { login: mutate, isLoggingIn: isLoading };
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.patch("/users/change-password", req);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully changed password");
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          toastId: "change-password-error",
        });
      },
    }
  );

  return { changePassword: mutate, isChangingPassword: isLoading };
};

export const useForgotPassword = () => {
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.post("/users/forgot-password", req);
    },
    {
      onSuccess: (data) => {
        window.open(data.data.link);
        toast.success("Email sent to your email address");
      },
    }
  );

  return { forgotPassword: mutate, isSendingMail: isLoading };
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.patch("/users/forgot-password", req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("reset-token")}`,
        },
      });
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully reset password");
        navigate("/");
        localStorage.deleteItem("reset-token");
      },
    }
  );

  return { resetPassword: mutate, isResettingPassword: isLoading };
};
