import { Tab, Tabs, Container } from "@mui/material";
import { useState } from "react";
import TabPanel from "../../components/TabPanel/TabPanel";
import Banner from "./components/Banner/Banner";
import Categories from "./components/Categories/Categories";
import AddProduct from "./components/Product/AddProduct";
const Settings = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Container
        sx={{
          mt: 2,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Tabs
          value={value}
          onChange={(e, value) => {
            setValue(value);
          }}
          sx={{
            width: "100%",
            justifyContent: "center",
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
              gap: "20px",
            },
          }}
        >
          <Tab label='Banners' />
          <Tab label='Categories' />
          <Tab label='Products' />
        </Tabs>
        <Banner value={value} />
        <Categories value={value} />
        <TabPanel value={value} index={2}>
          <AddProduct />
        </TabPanel>
      </Container>
    </>
  );
};

export default Settings;
