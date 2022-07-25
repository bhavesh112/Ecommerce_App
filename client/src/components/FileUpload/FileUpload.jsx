import { Button, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { useFormikContext } from "formik";

const FileUpload = ({ name, label, multiple }) => {
  const { setFieldValue, values, errors, touched, handleBlur } =
    useFormikContext();

  return (
    <>
      <Box mb={2}>
        <Button
          variant='outlined'
          component='label'
          fullWidth
          sx={{
            height: "50px",
            borderColor: errors[name] ? "error.main" : "primary.main",
          }}
        >
          {values[name] ? <>{values[name].length} file selected</> : label}
          <input
            type='file'
            hidden
            onBlur={handleBlur}
            accept='image/*'
            onChange={(event) => {
              setFieldValue(name, event.target.files);
            }}
            multiple={multiple}
          />
        </Button>
        {errors[name] && touched[name] && (
          <FormHelperText
            sx={{
              px: 2,
              color: "error.main",
            }}
          >
            {errors[name]}
          </FormHelperText>
        )}
      </Box>
    </>
  );
};

export default FileUpload;
