import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import { setPriceRange } from "../modules/products.slice";

export const useGetProductsByCategory = (category_id) => {
  const dispatch = useDispatch();
  const { data } = useQuery(
    ["products", category_id],
    async () => {
      return api.get(`/product/${category_id}`);
    },
    {
      onSuccess: (data) => {
        if (data.data.priceRange) dispatch(setPriceRange(data.data.priceRange));
      },
    }
  );
  //   console.log(error);
  console.log(data);
  return {
    products: data?.data?.products,
    priceRange: data?.data?.priceRange,
    productsByPrice: data?.data?.productsByPrice,
    isProductsLoading: data?.isLoading,
  };
};

export const useGetProductsByKeyword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("q");
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery(
    ["products", search],
    async () => {
      return api.get(`/product/feature?keyword=${search}`);
    },
    {
      onSuccess: (data) => {
        if (data.data.priceRange) dispatch(setPriceRange(data.data.priceRange));
      },
    }
  );

  return {
    products: data?.data?.products,
    priceRange: data?.data?.priceRange,
    productsByPrice: data?.data?.productsByPrice,
    isProductsLoading: isLoading,
  };
};

export const useGetProductById = (product_id) => {
  const { data } = useQuery(["product", product_id], async () => {
    return api.get(`/product/id/${product_id}`);
  });
  console.log(data);
  return {
    product: data?.data?.product,
    isProductLoading: data?.isLoading,
  };
};
