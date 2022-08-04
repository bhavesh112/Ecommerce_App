import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/api";
import { useClearCart } from "./cart.service";

export const useGetOrders = () => {
  const { data } = useQuery(["orders"], async () => {
    return await api.get("/order");
  });
  console.log(data);
  return {
    orders: data?.data?.orders,
  };
};

export const useCreateOrderMutation = (handleNext) => {
  const { clearCart } = useClearCart();
  const { mutate, data } = useMutation(
    async (order) => {
      return await api.post("/order", order);
    },
    {
      onSuccess: () => {
        toast.success("Order created");
        clearCart();
        handleNext();
      },
    }
  );

  return {
    createOrder: mutate,
    order_id: data?.data?.order?._id,
  };
};
