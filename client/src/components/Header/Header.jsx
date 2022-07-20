import {
  AppBar,
  Container,
  Toolbar,
  Button,
  TextField,
  Box,
  IconButton,
  Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./../../assets/images/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <AppBar position='sticky'>
      <Container>
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <img src={logo} alt='Emart' width='130px' />
          </Box>
          <Box position={"relative"}>
            <TextField
              variant='outlined'
              placeholder='Search for products, brands and more'
              value={search}
              name='search'
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: "360px",
                input: {
                  height: "42px",
                  boxSizing: "border-box",
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  pr: "40px",
                },
                fieldset: {
                  border: "none",
                },
              }}
            />
            <Zoom in={Boolean(search)}>
              <IconButton
                color='primary'
                sx={{
                  position: "absolute",
                  right: "0",
                  top: "1px",
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Zoom>
          </Box>
          <Toolbar
            sx={{
              gap: "20px",
            }}
          >
            <Button
              variant='outlined'
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Toolbar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
