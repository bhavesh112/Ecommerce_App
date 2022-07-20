import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6780ff",
    },
    secondary: {
      main: "#00c87b",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          boxShadow: "rgb(58 116 173 / 22%) 0px 3px 10px 0px",
        },
      },
    },
  },
  typography: {},
});

export default theme;
