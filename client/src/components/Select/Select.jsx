import { Autocomplete, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const Select = ({ name, options = [], ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const config = {
    ...field,
    ...props,
    options,
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.name === value.name,
    onChange: (event, value) => {
      setFieldValue(name, value);
    },
  };
  if (meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  return (
    <>
      <Autocomplete
        {...config}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            sx={{
              mb: 2,
            }}
          />
        )}
      />
    </>
  );
};

export default Select;
