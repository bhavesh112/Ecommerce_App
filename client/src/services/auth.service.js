import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.post("http://localhost:3001/api/users/signup", req);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully registered");
        navigate("/");
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
  const { data, isLoading } = useQuery({
    queryKey: "user",
    queryFn: () => {
      return api.get("http://localhost:3001/api/users/signin");
    },
  });

  return { user: data?.data, isLoading };
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (req) => {
      return api.post("http://localhost:3001/api/users/signin", req);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        toast.success("Successfully logged in");
        navigate("/");
      },
    }
  );

  return { login: mutate, isLoggingIn: isLoading };
};
