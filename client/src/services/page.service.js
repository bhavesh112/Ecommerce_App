import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetPageData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pageData"],
    queryFn: () => {
      return api.get("/page/get-banners");
    },
  });

  return { pageData: data?.data || [], isPageLoading: isLoading };
};

export const useGetCategoryData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => {
      return api.get("/category");
    },
  });
  console.log(data?.data);
  return { categoryData: data?.data, isCategoryLoading: isLoading };
};
