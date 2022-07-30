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
  useTheme,
  useMediaQuery,
} from "@mui/material";

import logo from "./../../assets/images/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../services/auth.service";
import UserMenu from "../UserMenu/UserMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Form, Formik } from "formik";
import { useGetCartItems } from "../../services/cart.service";
import Search from "../Search/Search";
import MobileNavigation from "../MobileNavigation/MobileNavigation";

export const AuthenticatedHeader = () => {
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (isLoading) return <Skeleton width='200px' variant='text' />;

  return (
    <>
      <Button
        variant='text'
        onClick={handleClick}
        sx={{
          padding: 0,
        }}
      >
        <Avatar
          sx={{
            mr: 1,
            height: "40px",
            width: "40px",
          }}
        >
          {user.name.charAt(0)}
        </Avatar>
        <Box fontSize='18px'>
          {isMobile ? user.name : user.name.split(" ")[0]}
        </Box>
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
        {isMobile && <Box ml={2}>Cart</Box>}
      </IconButton>
      <UserMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
};
export const NotAuthenticatedHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Button
        variant='outlined'
        fullWidth={isMobile}
        onClick={() => {
          navigate("/register");
        }}
      >
        Sign Up
      </Button>
      <Button
        variant='contained'
        fullWidth={isMobile}
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
  const navigate = useNavigate();
  const { isAuthenticated, user } = useGetUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position='sticky'>
      <Container>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: {
              xs: "0",
              sm: 1,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              "&> img": {
                width: {
                  xs: "100px",
                  sm: "120px",
                  md: "130px",
                },
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt='Emart' />
          </Box>
          {!isMobile && (
            <>
              <Search />
              <Toolbar
                sx={{
                  gap: {
                    xs: "0",
                    sm: "12px",
                    md: "20px",
                  },
                  px: {
                    xs: "0",
                    sm: 1,
                    md: 2,
                  },
                }}
              >
                {isAuthenticated ? (
                  <AuthenticatedHeader />
                ) : (
                  <NotAuthenticatedHeader />
                )}
              </Toolbar>
            </>
          )}
          {isMobile && <MobileNavigation />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
