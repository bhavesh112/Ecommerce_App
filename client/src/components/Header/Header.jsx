import {
  AppBar,
  Container,
  Toolbar,
  Button,
  TextField,
  Box,
  IconButton,
  Zoom,
  Avatar,
  Skeleton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./../../assets/images/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../services/auth.service";
import UserMenu from "../UserMenu/UserMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Form, Formik } from "formik";
import { useGetCartItems } from "../../services/cart.service";

const AuthenticatedHeader = () => {
  const { user, isLoading } = useGetUser();
  const { cartCount } = useGetCartItems();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (isLoading) return <Skeleton width='200px' variant='text' />;

  return (
    <>
      <Button variant='text' onClick={handleClick}>
        <Avatar
          sx={{
            mr: 1,
            height: "30px",
            width: "30px",
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        {user.name.split(" ")[0]}
      </Button>
      <IconButton
        color='primary'
        onClick={() => {
          navigate("/cart");
        }}
      >
        <Badge badgeContent={String(cartCount || 0)} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
};
const NotAuthenticatedHeader = () => {
  const navigate = useNavigate();
  return (
    <>
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
    </>
  );
};
const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, user } = useGetUser();

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
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt='Emart' width='130px' />
          </Box>
          <Box position={"relative"}>
            <Formik>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/search?q=${search}`);
                }}
              >
                <TextField
                  variant='outlined'
                  placeholder='Search for products, brands and more'
                  value={search}
                  name='q'
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
                    type='submit'
                  >
                    <SearchIcon />
                  </IconButton>
                </Zoom>
              </Form>
            </Formik>
          </Box>
          <Toolbar
            sx={{
              gap: "20px",
            }}
          >
            {isAuthenticated ? (
              <AuthenticatedHeader />
            ) : (
              <NotAuthenticatedHeader />
            )}
          </Toolbar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
