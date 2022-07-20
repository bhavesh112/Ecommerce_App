import { Container, Typography, Grid, Box, Button } from "@mui/material";

const CategorySection = ({ category }) => {
  return (
    <>
      <Container>
        <Box display='flex' justifyContent={"space-between"}>
          <Typography variant='h4' mt={2}>
            {category.name}
          </Typography>
          <Button variant='text'>See all</Button>
        </Box>
        <Grid container></Grid>
      </Container>
    </>
  );
};

export default CategorySection;
