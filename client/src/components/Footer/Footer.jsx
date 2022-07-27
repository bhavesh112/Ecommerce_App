import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        p: 1,
        mt: 5,
      }}
      display='flex'
      justifyContent={"center"}
    >
      <Box>
        <Typography variant='body1'>© 2020 Copyright : Capstone </Typography>
      </Box>
    </Box>
  );
};
export default Footer;
