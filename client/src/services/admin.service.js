import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import api from "../api/api";

export const useAddBannerMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) =>
      api.post("/page/add-banner", req, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pageData"]);
      },
    }
  );

  return {
    addBanner: mutate,
    isLoading,
  };
};
export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => api.delete("/page/delete-banner/" + req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pageData"]);
      },
    }
  );

  return {
    deleteBanner: mutate,
    isLoading,
  };
};

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => api.post("/category/create/", req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categoryData"]);
      },
    }
  );

  return {
    addCategory: mutate,
    isLoading,
  };
};
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => api.delete("/category/delete/" + req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categoryData"]);
      },
    }
  );

  return {
    deleteCategory: mutate,
    isLoading,
  };
};

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (req) => api.post("/product/create/", req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        queryClient
          .getQueryCache()
          .findAll(["products"])
          .forEach((query) => query.reset());
        toast.success("Product added successfully");
      },
    }
  );

  return {
    addProduct: mutate,
    isLoading,
  };
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (req) => api.delete("/product/delete/" + req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        toast.success("Product deleted successfully");
      },
    }
  );

  return {
    deleteProduct: mutate,
    isLoading,
  };
};
