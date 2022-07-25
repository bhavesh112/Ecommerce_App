import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        queryClient.invalidateQueries(["productData"]);
      },
    }
  );

  return {
    addProduct: mutate,
    isLoading,
  };
};
