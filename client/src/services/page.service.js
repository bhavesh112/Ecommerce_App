import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetPageData = () => {
  const { data, isLoading } = useQuery({
    queryKey: "pageData",
    queryFn: () => {
      return api.get("http://localhost:8000/api/page/get-banners");
    },
  });

  return { pageData: data?.data, isPageLoading: isLoading };
};

export const useGetCategoryData = () => {
  const { data, isLoading } = useQuery({
    queryKey: "categoryData",
    queryFn: () => {
      return api.get("http://localhost:8000/api/category");
    },
  });
  console.log(data?.data);
  return { categoryData: data?.data, isCategoryLoading: isLoading };
};
