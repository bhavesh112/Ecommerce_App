import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/api";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (item) => {
      return api.post("/cart/addtocart", item);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Item added to cart", {
          position: "bottom-right",
        });
        queryClient.setQueryData(["cart"], data);
      },
    }
  );
  return {
    addToCart: mutate,
  };
};

export const useGetCartItems = () => {
  const { data } = useQuery(["cart"], async () => {
    return await api.get("/cart/getCartItems");
  });

  return {
    cartItems: data?.data?.cart?.cartItems,
    cartCount: data?.data?.cart?.cartItems.length,
  };
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (id) => {
      return api.delete("/cart/remove/" + id);
    },
    {
      onSuccess: (data) => {
        toast.success("Item removed from cart", {
          position: "bottom-right",
        });
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  return {
    removeFromCart: mutate,
  };
};
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (item) => {
      return api.patch("/cart/update/" + item._id, {
        quantity: item.quantity,
      });
    },
    {
      onSuccess: (data) => {
        toast.success("Item updated in cart", {
          position: "bottom-right",
          delay: 1000,

          toastId: "updateCart",
        });
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );

  return {
    updateCart: mutate,
  };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async () => {
      return await api.delete("/cart/removeAll");
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  return {
    clearCart: mutate,
  };
};
