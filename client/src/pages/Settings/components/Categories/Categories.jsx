import Delete from "@mui/icons-material/Delete";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TabPanel from "../../../../components/TabPanel/TabPanel";
import TextInput from "../../../../components/TextInput/TextInput";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../../services/admin.service";
import { useGetCategoryData } from "../../../../services/page.service";

const Categories = ({ value }) => {
  const { categoryData, isCategoryLoading } = useGetCategoryData();
  const { addCategory } = useAddCategoryMutation();
  const { deleteCategory } = useDeleteCategoryMutation();
  return (
    <TabPanel value={value} index={1}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography variant='h4' gutterBottom>
            Added Categories
          </Typography>
          {isCategoryLoading ? (
            <CircularProgress />
          ) : (
            <List>
              {categoryData.map((item) => (
                <ListItem
                  sx={{
                    boxShadow: 2,
                  }}
                  secondaryAction={
                    <IconButton
                      color='error'
                      onClick={() => {
                        deleteCategory(item._id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item.name} />
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
              addCategory(values);
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Name is required"),
            })}
          >
            {() => (
              <Form
                style={{
                  marginTop: "8px",
                }}
              >
                <Typography variant='h4' gutterBottom>
                  Add Category
                </Typography>

                <TextInput name='name' label='Name' />

                <Button variant='contained' type='submit'>
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default Categories;
