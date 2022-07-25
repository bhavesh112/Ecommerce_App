import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetProductsByCategory = (category_id) => {
  const { data } = useQuery(["products", category_id], async () => {
    return api.get(`/product/${category_id}`);
  });

  return {
    products: data?.data?.products,
    priceRange: data?.data?.priceRange,
    productsByPrice: data?.data?.productsByPrice,
  };
};
