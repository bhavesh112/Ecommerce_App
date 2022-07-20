import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const TextInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const config = {
    ...props,
    ...field,
    variant: "outlined",
    fullWidth: true,
    ...(props.type === "password" && {
      InputProps: {
        endAdornment: (
          <>
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </>
        ),
      },
      type: showPassword ? "text" : "password",
    }),
  };
  if (meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  return (
    <TextField
      {...config}
      sx={{
        mb: 2,
      }}
    />
  );
};

export default TextInput;
