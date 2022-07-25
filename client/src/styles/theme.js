import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6780ff",
    },
    secondary: {
      main: "#00c87b",
      contrastText: "#fff",
    },
    text: {
      secondary: "#a1a1b6",
      primary: "#0a0938",
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

    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    h4: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "600",
    },
  },
});

export default theme;
