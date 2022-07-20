import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";

const Check = (props) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <FormControlLabel
        sx={{
          mt: -1,
          mb: 1,
        }}
        label={props.label}
        control={<Checkbox />}
        onChange={(e, checked) => {
          setFieldValue(props.name, checked);
        }}
      />
    </>
  );
};

export default Check;
