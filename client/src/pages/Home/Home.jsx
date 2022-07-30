import { Box, Card, CardMedia, Container, Paper } from "@mui/material";
import {
  useGetCategoryData,
  useGetPageData,
} from "../../services/page.service";
import Carousel from "react-material-ui-carousel";
import CategorySection from "../../components/CategorySection/CategorySection";
import Search from "../../components/Search/Search";
const Home = () => {
  const { pageData, isPageLoading } = useGetPageData();
  const { categoryData, isCategoryLoading } = useGetCategoryData();
  if (isPageLoading || isCategoryLoading) return null;

  return (
    <>
      <Box
        width='100%'
        sx={{
          backgroundColor: "primary.main",
          p: 2,
        }}
      >
        <Container>
          <Carousel animation='slide' swipe>
            {pageData.map((item) => (
              <Card
                sx={{
                  height: "300px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.href = item.navigateTo;
                }}
              >
                <CardMedia
                  image={`http://localhost:3003/${item.img}`}
                  component='img'
                  height={"300"}
                  width={"100%"}
                />
              </Card>
            ))}
          </Carousel>
        </Container>
      </Box>
      {categoryData.map((category) => (
        <CategorySection key={category._id} category={category} />
      ))}
    </>
  );
};

export default Home;
