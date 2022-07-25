import { Box } from "@mui/material";

const TabPanel = ({ children, value, index }) => {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      mt={2}
    >
      {children}
    </Box>
  );
};

export default TabPanel;
