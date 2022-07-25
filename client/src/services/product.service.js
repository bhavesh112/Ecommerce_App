import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import api from "../api/api";

export const useGetProductsByCategory = (category_id) => {
  const { data } = useQuery(["products", category_id], async () => {
    return api.get(`/product/${category_id}`);
  });
  //   console.log(error);
  console.log(data);
  return {
    products: data?.data?.products,
    priceRange: data?.data?.priceRange,
    productsByPrice: data?.data?.productsByPrice,
  };
};

export const useGetProductsByKeyword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("q");

  const { data, isLoading, error } = useQuery(
    ["products", search],
    async () => {
      return api.get(`/product/feature?keyword=${search}`);
    }
  );

  console.log(data);
  if (error) {
    return {
      products: [],
      isProductsLoading: false,
    };
  }
  return {
    products: data?.data?.product,
    isProductsLoading: isLoading,
  };
};
