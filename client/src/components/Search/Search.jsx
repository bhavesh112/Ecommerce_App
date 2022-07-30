import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      position={"relative"}
      sx={{
        width: {
          xs: "100%",
          sm: "auto",
          md: "auto",
        },
      }}
    >
      <Formik>
        <Form
          style={{
            width: isMobile ? "100%" : "auto",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${search}`);
          }}
        >
          <TextField
            variant='outlined'
            placeholder={
              isMobile ? "Search...." : "Search for products, brands, etc."
            }
            value={search}
            name='q'
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
                md: "320px",
              },
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
  );
};

export default Search;
