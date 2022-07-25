import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const ProductCard = ({ product }) => {
  if (!product) return null;
  return (
    <>
      <Grid item md={3}>
        <Card
        //   sx={{
        //     "&:hover": {
        //       "& .add-to-cart": {
        //         transform: "translateY(0)",
        //       },
        //     },
        //   }}
        >
          <Box
            width='100%'
            sx={{
              border: "3px solid ",
              borderColor: "secondary.main",
            }}
          >
            <CardMedia
              image={`http://localhost:8000/${product.productPicture[0].img}`}
              component='img'
              height='160'
              sx={{
                width: "auto",
                mx: "auto",
                maxWidth: "100%",
              }}
            />
          </Box>
          <CardContent>
            <Typography
              variant='h5'
              fontSize='20px'
              align='center'
              fontWeight={"600"}
            >
              {product.name}
            </Typography>
            <Typography variant='body2' fontSize='14px' align='center' mb={1}>
              {product.description}
            </Typography>
            <Typography
              variant='body1'
              color='secondary'
              fontSize={"18px"}
              align='center'
            >
              ₹ {product?.price?.toLocaleString("en-IN")}
            </Typography>
          </CardContent>
          <CardActionArea
          // className='add-to-cart'
          // sx={{
          //   borderRadius: "0px",
          //   transform: "translateY(calc(100% + 2px))",
          //   transition: "transform 0.3s ease-in-out",
          // }}
          >
            <CardActions
              sx={{
                padding: 0,
              }}
            >
              <Button fullWidth color='secondary' variant='contained'>
                Add to Cart
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
