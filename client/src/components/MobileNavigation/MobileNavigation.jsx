import { Box, Drawer, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Search from "../Search/Search";
import Close from "@mui/icons-material/Close";
import { useGetUser } from "../../services/auth.service";
import { AuthenticatedHeader, NotAuthenticatedHeader } from "../Header/Header";
import { useLocation } from "react-router-dom";
const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useGetUser();
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        color='primary'
      >
        <MenuOpenIcon fontSize='large' />
      </IconButton>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          display={"flex"}
          flexDirection='column'
          width='300px'
          gap={"20px"}
          alignItems='flex-start'
          p={2}
        >
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              alignSelf: "flex-end",
            }}
          >
            <Close />
          </IconButton>
          <Search />
          {isAuthenticated ? (
            <AuthenticatedHeader />
          ) : (
            <NotAuthenticatedHeader />
          )}
        </Box>
      </Drawer>
    </>
  );
};
export default MobileNavigation;
