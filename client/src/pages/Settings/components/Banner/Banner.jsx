import Delete from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import FileUpload from "../../../../components/FileUpload/FileUpload";
import TabPanel from "../../../../components/TabPanel/TabPanel";
import TextInput from "../../../../components/TextInput/TextInput";
import { useGetPageData } from "../../../../services/page.service";
import * as yup from "yup";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
} from "../../../../services/admin.service";
const Banner = ({ value }) => {
  const { pageData, isPageLoading } = useGetPageData();
  const { addBanner } = useAddBannerMutation();
  const { deleteBanner } = useDeleteBannerMutation();
  return (
    <TabPanel value={value} index={0}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography variant='h4' gutterBottom>
            Added Banners
          </Typography>
          {isPageLoading ? (
            <CircularProgress />
          ) : (
            <List>
              {pageData.map((item) => (
                <ListItem
                  sx={{
                    boxShadow: 2,
                  }}
                  secondaryAction={
                    <IconButton
                      color='error'
                      onClick={() => {
                        deleteBanner(item._id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={`http://localhost:3003/${item.img}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={item.navigateTo}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        <Grid item md={6}>
          <Formik
            initialValues={{
              name: "",
              img: [],
              navigateTo: "",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("navigateTo", values.navigateTo);
              formData.append("img", values.img[0]);

              addBanner(formData);
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Name is required"),
              img: yup.mixed().required("Image is required").nullable(),
              navigateTo: yup.string().required("Navigate To is required"),
            })}
          >
            {() => (
              <Form
                style={{
                  marginTop: "8px",
                }}
              >
                <Typography variant='h4' gutterBottom>
                  Add Banner
                </Typography>

                <TextInput name='name' label='Name' />
                <TextInput name='navigateTo' label='Navigate To' />
                <FileUpload name='img' />
                <Button variant='contained' type='submit'>
                  Add Banner
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default Banner;
