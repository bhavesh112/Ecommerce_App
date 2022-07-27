const { CircularProgress } = require("@mui/material");
const { Container, Box } = require("@mui/system");

const FullScreenLoader = () => {
  <Container
    sx={{
      minHeight: "calc(100vh - 64px)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  </Container>;
};
export default FullScreenLoader;
