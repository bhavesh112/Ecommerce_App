import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import FileUpload from "../../../../components/FileUpload/FileUpload";
import Select from "../../../../components/Select/Select";
import TextInput from "../../../../components/TextInput/TextInput";
import { useGetCategoryData } from "../../../../services/page.service";
import * as yup from "yup";
import { useAddProductMutation } from "../../../../services/admin.service";
const AddProduct = ({
  initialValues = {
    name: "",
    price: "",
    description: "",
    category: null,
    productPicture: "",
    quantity: "",
  },
}) => {
  const { categoryData, isCategoryLoading } = useGetCategoryData();
  const { addProduct } = useAddProductMutation();
  return (
    <>
      <Box display='block' maxWidth='50%' mx='auto'>
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object().shape({
            name: yup.string().required("Name is required"),
            category: yup.mixed().required("Category is required"),
            price: yup.number().required("Price is required"),
            description: yup.string().required("Description is required"),
            productPicture: yup.mixed().required("Image is required"),
            quantity: yup.number().required("Quantity is required"),
          })}
          onSubmit={(values, helpers) => {
            // helpers.resetForm();
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("category", values.category._id);

            for (let i = 0; i < values.productPicture.length; i++) {
              formData.append("productPicture", values.productPicture[i]);
            }
            formData.append("quantity", values.quantity);
            addProduct(formData);
          }}
        >
          <Form>
            <TextInput name='name' label='Name' />
            <TextInput name='price' label='Price' type='number' />
            <TextInput name='description' label='Description' />
            <Select name='category' label='Category' options={categoryData} />
            <TextInput name='quantity' label='Quantity' type='number' />
            <FileUpload
              name='productPicture'
              label='Add Product Images'
              multiple
            />
            <Button variant='contained' type='submit'>
              Add Product
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;
